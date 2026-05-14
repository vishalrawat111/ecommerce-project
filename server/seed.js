const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [];

const categories = ["Shoes", "Electronics", "Clothes", "Accessories"];

for (let i = 1; i <= 100; i++) {
    products.push({
        name: `Product ${i}`,
        price: Math.floor(Math.random() * 9000) + 500,
        image: `https://picsum.photos/200?random=${i}`,
        description: `This is product ${i}`,
        category: categories[i % categories.length],
        stock: Math.floor(Math.random() * 50) + 1
    });
}

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected for seeding");

        await Product.deleteMany();
        console.log("Old products cleared");

        await Product.insertMany(products);
        console.log("✅ 100 PRODUCTS INSERTED SUCCESSFULLY");

        mongoose.disconnect();
        process.exit();
    } catch (err) {
        console.log("Seed Error:", err);
        process.exit(1);
    }
};

seedDB();