const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/chatbot", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  const lastMessage = messages[messages.length - 1]?.content.toLowerCase();

  try {
    let location = req.body.location || null;

    if (!location) {
      const locationRegex =
        /(?:location:|i live in|i am in|near|around)\s*(.+?)(?: area| city| town|$)/i;

      const locationMessages = messages.filter(
        (msg) => msg.role === "user" && locationRegex.test(msg.content)
      );

      const lastLocationMessage = locationMessages[locationMessages.length - 1];

      if (lastLocationMessage) {
        const match = lastLocationMessage.content.match(locationRegex);
        if (match) {
          location = match[1].trim();
        }
      }
    }

    if (
      lastMessage.includes("recommend") &&
      lastMessage.includes("therapist")
    ) {
      if (!location) {
        return res.json({
          reply:
            "Please tell me your location first by typing something like: 'Location: Boston' or 'I live in Hanover'.",
        });
      }

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
          temperature: 0.6,
          messages: [
            {
              role: "system",
              content:
                "You are a licensed mental health therapist chatbot having a supportive, empathetic, and professional conversation with a patient. Speak in a calm, encouraging, and respectful tone. Do not provide medical diagnoses or treatment plans. When asked for therapist recommendations, say: 'Please visit the Find Therapists section above.' Then show Yelp data clearly.",
            },
            {
              role: "user",
              content: `The user is looking for therapists in ${location}. Based on the following Yelp therapist options, recommend the top 3:

${descriptions}`,
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

      const reply = `Please visit the Find Therapists section above for the full list.\n\n${openaiResponse.data.choices[0].message.content}`;
      return res.json({ reply, businesses });
    }

    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              "You are a licensed mental health therapist chatbot. Always respond in an empathetic tone. Avoid giving medical advice or crisis intervention. Focus on emotional support and active listening.",
          },
          ...messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = openaiResponse.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error.response?.data || error.message);
    res.status(500).json({ error: "Chatbot request failed." });
  }
});

module.exports = router;
