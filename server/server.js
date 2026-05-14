const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// ================= MIDDLEWARE =================
app.use(cors({ origin: "*" }));
app.use(express.json());

console.log("MONGO_URI Loaded:", process.env.MONGO_URI ? "✅ YES" : "❌ MISSING");

// ================= ROUTES =================
const paymentRoutes = require("./routes/payment");
const productRoutes = require("./routes/productRoutes"); // ✅ FIXED HERE

// REGISTER ROUTES
app.use("/api/payment", paymentRoutes);
app.use("/api/products", productRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("✅ Backend Running Successfully");
});

// ================= MONGO DB =================
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