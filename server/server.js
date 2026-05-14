const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// ✅ Sahi tareeke se .env load kar rahe hain
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

console.log("MONGO_URI Loaded:", process.env.MONGO_URI ? "✅ YES" : "❌ MISSING");

// Routes
const paymentRoutes = require("./routes/payment");
app.use("/api/payment", paymentRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("✅ Backend Running Successfully");
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`💳 Payment API Ready`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });