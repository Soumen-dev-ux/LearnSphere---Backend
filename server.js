const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ MIDDLEWARE 
app.use(cors());
app.use(express.json());

const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);


// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

//Enrollment
const enrollmentRoutes = require("./routes/enrollmentRoutes");
app.use("/api/enroll", enrollmentRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
  });
