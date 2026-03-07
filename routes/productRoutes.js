const express = require("express");
const router = express.Router();

let products = [];

// GET all products
router.get("/", (req, res) => {
    res.json(products);
});

// POST add product
router.post("/", (req, res) => {
    const product = req.body;
    products.push(product);
    res.json(product);
});

module.exports = router;