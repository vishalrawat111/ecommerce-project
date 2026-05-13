const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();


// ROUTES
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");


// MIDDLEWARE
app.use(cors());
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


// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });


// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});