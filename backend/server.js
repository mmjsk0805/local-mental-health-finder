const express = require("express");
const cors = require("cors");
require("dotenv").config();

const calendarRoutes = require("./routes/calendar");
const yelpRoutes = require("./routes/yelp");
const recommendationRoutes = require("./routes/recommendation");
const chatbotRoutes = require("./routes/chatbot");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/calendar", calendarRoutes);
app.use("/api", yelpRoutes);
app.use("/api", recommendationRoutes);
app.use("/api", chatbotRoutes);

app.use((req, res) => {
  res.status(404).send("Route not found.");
});

app.listen(3001, () => {
  console.log("Backend running on port 3001");
});
