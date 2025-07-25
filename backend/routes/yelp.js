const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/search-therapists", async (req, res) => {
  const { location, term } = req.query;

  if (!location) {
    return res
      .status(400)
      .json({ error: "Location query parameter is required." });
  }

  try {
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
