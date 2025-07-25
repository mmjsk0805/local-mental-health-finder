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
  res.redirect(`${redirectBase}/oauth-success?access_token=${token}`);
});

// Route to create event from frontend data
router.post("/create-event", async (req, res) => {
  const { tokens, event } = req.body;

  if (!tokens || !event) {
    return res.status(400).json({ error: "Missing tokens or event data." });
  }

  const tempClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  tempClient.setCredentials(tokens);

  const calendar = google.calendar({ version: "v3", auth: tempClient });

  try {
    console.log("Creating event with data:", event);

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
