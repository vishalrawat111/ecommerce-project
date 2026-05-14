const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// ✅ MUST FIRST LOAD ENV
dotenv.config();

const app = express();

// ROUTES
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

// MIDDLEWARE
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// TEST ROUTES
app.get("/", (req, res) => {
  res.send("API Running");
});

app.get("/test-direct", (req, res) => {
  res.json({
    message: "Direct Route Working"
  });
});

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// 🔥 DEBUG (TEMP)
console.log("MONGO_URI:", process.env.MONGO_URI);

// MONGODB CONNECTION (SAFE VERSION)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });