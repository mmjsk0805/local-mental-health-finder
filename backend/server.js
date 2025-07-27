const express = require("express");
const cors = require("cors");
require("dotenv").config();

const calendarRoutes = require("./routes/calendar");
const yelpRoutes = require("./routes/yelp");
const recommendationRoutes = require("./routes/recommendation");
const chatbotRoutes = require("./routes/chatbot");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://local-mental-health-find-96e8c.web.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use("/calendar", calendarRoutes);
app.use("/api", yelpRoutes);
app.use("/api", recommendationRoutes);
app.use("/api", chatbotRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
