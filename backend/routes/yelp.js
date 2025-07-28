const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Route: Search for therapists using Yelp Fusion API
router.get("/search-therapists", async (req, res) => {
  const { location, term } = req.query;

  // Location is required to perform the search
  if (!location) {
    return res
      .status(400)
      .json({ error: "Location query parameter is required." });
  }

  try {
    // Call Yelp API to search for therapists in the given location
    const response = await axios.get(
      "https://api.yelp.com/v3/businesses/search",
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
        params: {
          location,
          term: term || "therapy",
          limit: 10,
        },
      }
    );

    // Sort results by rating (highest first) before sending back
    const sortedBusinesses = response.data.businesses.sort(
      (a, b) => b.rating - a.rating
    );

    res.json(sortedBusinesses);
  } catch (error) {
    console.error("Yelp API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch therapists" });
  }
});

module.exports = router;
