const express = require("express");
const { google } = require("googleapis");
require("dotenv").config();

const router = express.Router();

// Set up OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Route to initiate OAuth flow
router.get("/auth", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.events"],
    prompt: "consent",
  });

  res.redirect(authUrl);
});

// OAuth2 callback route
router.get("/oauth2callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  const queryString = new URLSearchParams({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  }).toString();

  const redirectBase = process.env.FRONTEND_BASE_URL || "http://localhost:5173";
  res.redirect(
    `${redirectBase}/oauth-success?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`
  );
});

// Route to create event from frontend data
router.post("/create-event", async (req, res) => {
  try {
    const { tokens, event } = req.body;

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oAuth2Client.setCredentials({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: {
        summary: event.summary,
        description: event.description,
        start: {
          dateTime: event.startTime,
          timeZone: "America/New_York",
        },
        end: {
          dateTime: event.endTime,
          timeZone: "America/New_York",
        },
      },
    });

    console.log("✅ Google Calendar API Response:", response.data);
    return res.json({ htmlLink: response.data.htmlLink });
  } catch (err) {
    console.error(
      "❌ Calendar event creation error:",
      err.response?.data || err.message || err
    );
    return res.status(500).json({ error: "Failed to create event." });
  }
});

module.exports = router;
