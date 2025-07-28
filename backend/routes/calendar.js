const express = require("express");
const { google } = require("googleapis");
require("dotenv").config();

const router = express.Router();

// OAuth2 setup using credentials from .env
const globalOAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Redirects user to Google's OAuth consent screen
router.get("/auth", (req, res) => {
  const authUrl = globalOAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
  res.redirect(authUrl);
});

// Handles callback from Google after user authorizes the app
router.get("/oauth2callback", async (req, res) => {
  try {
    const { code } = req.query;

    // Exchange code for tokens
    const { tokens } = await globalOAuth2Client.getToken(code);
    globalOAuth2Client.setCredentials(tokens);

    // Grab user's email
    const oauth2 = google.oauth2({
      auth: globalOAuth2Client,
      version: "v2",
    });
    const userInfo = await oauth2.userinfo.get();
    const userEmail = userInfo.data.email;

    // Send tokens + email back to frontend
    const redirectBase =
      process.env.FRONTEND_BASE_URL || "http://localhost:5173";
    const queryString = new URLSearchParams({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      user_email: userEmail,
    }).toString();

    res.redirect(`${redirectBase}/oauth-success?${queryString}`);
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.status(500).json({ error: "OAuth callback failed" });
  }
});

// Creates a new calendar event for the user
router.post("/create-event", async (req, res) => {
  try {
    const { tokens, event } = req.body;

    if (!event.start || !event.end) {
      return res.status(400).json({ error: "Missing start or end time" });
    }

    // Set up OAuth client with user's tokens
    const userOAuthClient = new google.auth.OAuth2();
    userOAuthClient.setCredentials({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });

    const calendar = google.calendar({ version: "v3", auth: userOAuthClient });

    const newEvent = {
      summary: event.summary,
      description: event.description,
      start: {
        dateTime: event.start,
        timeZone: "America/New_York",
      },
      end: {
        dateTime: event.end,
        timeZone: "America/New_York",
      },
    };

    console.log("📤 Sending event to Google Calendar:", newEvent);

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: newEvent,
    });

    console.log("✅ Calendar response:", response.data);
    res.json({ htmlLink: response.data.htmlLink });
  } catch (err) {
    console.error("❌ Calendar event creation error:");
    if (err.response?.data) {
      console.error("➡️ Response:", err.response.data);
    } else if (err.errors) {
      console.error("➡️ Errors:", err.errors);
    } else {
      console.error("➡️ Message:", err.message);
    }
    res.status(500).json({ error: "Failed to create event." });
  }
});

module.exports = router;
