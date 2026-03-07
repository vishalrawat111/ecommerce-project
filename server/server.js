const productRoutes = require("./routes/productRoutes");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Ecommerce API is running...");
});

const PORT = process.env.PORT || 5000;
app.use("/api/products", productRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});