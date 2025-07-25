const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/recommendation", async (req, res) => {
  const { location, messages } = req.body;

  if (!location || !messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Location and messages are required." });
  }

  try {
    const yelpResponse = await axios.get("https://api.yelp.com/v3/businesses/search", {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
      params: {
        location,
        term: "therapy",
        limit: 10,
      },
    });

    const businesses = yelpResponse.data.businesses || [];

    const descriptions = businesses.map(
      (biz) =>
        `${biz.name}, ${biz.location.address1}, ${biz.categories
          .map((c) => c.title)
          .join(", ")}, ${biz.review_count} reviews, ${biz.rating} stars`
    ).join("\n");

    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          ...messages,
          { role: "user", content: `Based on the following therapist options, suggest the top 3 therapists for the user's needs: \n${descriptions}` },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiReply = openaiResponse.data.choices[0].message.content;
    res.json({ aiReply, businesses });

  } catch (error) {
    console.error("Recommendation error:", error.response?.data || error.message);
    res.status(500).json({ error: "Recommendation failed." });
  }
});

module.exports = router;
