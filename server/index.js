require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const aiRoutes = require("./routes/aiRoutes");

const errorHandler = require("./middleware/errorHandler");

connectDB();

const app = express();

/* Middleware */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Health Routes */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CivicDesk API is running successfully",
  });
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "API endpoint working",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "Server running",
    timestamp: new Date(),
  });
});

/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/ai", aiRoutes);

/* Error Handler */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});