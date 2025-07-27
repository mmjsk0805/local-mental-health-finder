const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/recommendation", async (req, res) => {
  const { location, messages } = req.body;

  if (!location || !messages || !Array.isArray(messages)) {
    return res
      .status(400)
      .json({ error: "Location and messages are required." });
  }

  try {
    const yelpResponse = await axios.get(
      "https://api.yelp.com/v3/businesses/search",
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
        params: {
          location,
          term: "therapy",
          limit: 10,
        },
      }
    );

    const businesses = yelpResponse.data.businesses || [];

    const descriptions = businesses
      .map(
        (biz) =>
          `${biz.name}, ${biz.location.address1}, ${biz.categories
            .map((c) => c.title)
            .join(", ")}, ${biz.review_count} reviews, ${biz.rating} stars`
      )
      .join("\n");

    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          ...messages,
          {
            role: "user",
            content: `
        You are an AI assistant helping users find therapists for depression. Below is a list of therapy businesses returned from Yelp. Your job is to choose the top 3 that best fit the user's needs based on psychological relevance, user ratings, and available services.
        
        Only recommend from the businesses listed. Refer to them **exactly by name** as shown (e.g., 'Williamsburg Therapy Group', not 'Dr. Smith').
        
        Use this format:
        
        1. [Business Name] - Short paragraph describing why it's good for depression care.
        
        2. [Business Name] - ...
        
        3. [Business Name] - ...
        
        At the end, add a paragraph explaining why you selected them.
        
        Here is the list of options:
        
        ${descriptions}
        `,
          },
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
    console.error(
      "Recommendation error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Recommendation failed." });
  }
});

module.exports = router;
