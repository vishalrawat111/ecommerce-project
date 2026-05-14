import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// 🔐 ROUTES
import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";

dotenv.config();

const app = express();

// 📦 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔐 AUTH ROUTES
app.use("/api/auth", authRoutes);

// 💳 PAYMENT ROUTES
app.use("/api/payment", paymentRoutes);

// 🏠 TEST ROUTE
app.get("/", (req, res) => {
    res.send("API is running...");
});

// 🗄️ DATABASE CONNECT
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ DB Error:", err));

// 🚀 SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});