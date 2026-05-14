const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
    {
        name: "iPhone 15 Pro",
        price: 134999,
        image:
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
        description:
            "Apple flagship smartphone with A17 Pro chip and titanium design.",
        category: "Mobiles",
        stock: 15,
    },

    {
        name: "Samsung Galaxy S24 Ultra",
        price: 124999,
        image:
            "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
        description:
            "Samsung premium smartphone with AI-powered camera system.",
        category: "Mobiles",
        stock: 10,
    },

    {
        name: "MacBook Air M2",
        price: 99999,
        image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=800",
        description: "Apple lightweight laptop with M2 chip performance.",
        category: "Laptops",
        stock: 8,
    },

    {
        name: "Dell XPS 13",
        price: 84999,
        image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        description:
            "Premium Dell ultrabook with InfinityEdge display.",
        category: "Laptops",
        stock: 12,
    },

    {
        name: "Sony WH-1000XM5",
        price: 29999,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        description:
            "Wireless premium noise cancelling headphones.",
        category: "Audio",
        stock: 20,
    },

    {
        name: "JBL Flip 6",
        price: 8999,
        image:
            "https://images.unsplash.com/photo-1589003077984-894e133dabab",
        description:
            "Portable Bluetooth speaker with deep bass sound.",
        category: "Audio",
        stock: 25,
    },

    {
        name: "Nike Air Max",
        price: 8999,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        description:
            "Comfortable and stylish running shoes from Nike.",
        category: "Shoes",
        stock: 18,
    },

    {
        name: "Adidas Ultraboost",
        price: 11999,
        image:
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
        description:
            "High-performance Adidas running shoes.",
        category: "Shoes",
        stock: 22,
    },

    {
        name: "Apple Watch Series 9",
        price: 45999,
        image:
            "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
        description:
            "Advanced smartwatch with fitness tracking.",
        category: "Watches",
        stock: 10,
    },

    {
        name: "Casio G-Shock",
        price: 7999,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        description:
            "Durable and stylish digital sports watch.",
        category: "Watches",
        stock: 30,
    },
    {
        name: "HP Pavilion Gaming Laptop",
        price: 75999,
        image:
            "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6",
        description:
            "Gaming laptop with powerful graphics and smooth performance.",
        category: "Laptops",
        stock: 7,
    },

    {
        name: "Lenovo ThinkPad X1",
        price: 89999,
        image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        description:
            "Professional business laptop with excellent build quality.",
        category: "Laptops",
        stock: 9,
    },

    {
        name: "Canon EOS DSLR",
        price: 64999,
        image:
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
        description:
            "Professional DSLR camera for stunning photography.",
        category: "Cameras",
        stock: 11,
    },

    {
        name: "Sony Alpha Mirrorless Camera",
        price: 94999,
        image:
            "https://images.unsplash.com/photo-1516724562728-afc824a36e84",
        description:
            "High-quality mirrorless camera for creators.",
        category: "Cameras",
        stock: 5,
    },

    {
        name: "Boat Rockerz 550",
        price: 2499,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        description:
            "Wireless headphones with deep bass sound.",
        category: "Audio",
        stock: 40,
    },

    {
        name: "AirPods Pro",
        price: 24999,
        image:
            "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46",
        description:
            "Apple premium wireless earbuds with ANC.",
        category: "Audio",
        stock: 18,
    },

    {
        name: "Puma Running Shoes",
        price: 6999,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        description:
            "Comfortable sports shoes for daily running.",
        category: "Shoes",
        stock: 24,
    },

    {
        name: "Reebok Classic Sneakers",
        price: 5499,
        image:
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
        description:
            "Classic stylish sneakers for everyday wear.",
        category: "Shoes",
        stock: 28,
    },

    {
        name: "Samsung 55 Inch Smart TV",
        price: 62999,
        image:
            "https://images.unsplash.com/photo-1593784991095-a205069470b6",
        description:
            "4K Ultra HD Smart TV with vibrant display.",
        category: "TVs",
        stock: 6,
    },

    {
        name: "LG OLED Smart TV",
        price: 89999,
        image:
            "https://images.unsplash.com/photo-1461151304267-38535e780c79",
        description:
            "Premium OLED television with cinematic picture quality.",
        category: "TVs",
        stock: 4,
    },
    {
        name: "PlayStation 5",
        price: 54999,
        image:
            "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
        description:
            "Sony next-gen gaming console with ultra-fast performance.",
        category: "Gaming",
        stock: 10,
    },

    {
        name: "Xbox Series X",
        price: 52999,
        image:
            "https://images.unsplash.com/photo-1621259182978-fbf93132d53d",
        description:
            "Microsoft powerful gaming console with 4K gaming support.",
        category: "Gaming",
        stock: 8,
    },

    {
        name: "Gaming Mechanical Keyboard",
        price: 4999,
        image:
            "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
        description:
            "RGB mechanical gaming keyboard with fast response keys.",
        category: "Gaming",
        stock: 25,
    },

    {
        name: "Logitech Gaming Mouse",
        price: 2999,
        image:
            "https://images.unsplash.com/photo-1527814050087-3793815479db",
        description:
            "Ergonomic gaming mouse with customizable DPI settings.",
        category: "Gaming",
        stock: 32,
    },

    {
        name: "Men's Black Hoodie",
        price: 1999,
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        description:
            "Comfortable cotton hoodie for casual winter wear.",
        category: "Clothing",
        stock: 40,
    },

    {
        name: "Men's Denim Jacket",
        price: 3499,
        image:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        description:
            "Stylish blue denim jacket with premium quality fabric.",
        category: "Clothing",
        stock: 20,
    },

    {
        name: "Women's Handbag",
        price: 2599,
        image:
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        description:
            "Elegant handbag perfect for daily and party use.",
        category: "Accessories",
        stock: 18,
    },

    {
        name: "Women's Sunglasses",
        price: 1499,
        image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        description:
            "Stylish UV-protected sunglasses for modern fashion.",
        category: "Accessories",
        stock: 30,
    },

    {
        name: "Smart Fitness Band",
        price: 3499,
        image:
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6",
        description:
            "Fitness tracker with heart rate and sleep monitoring.",
        category: "Wearables",
        stock: 16,
    },

    {
        name: "Amazon Echo Dot",
        price: 4499,
        image:
            "https://images.unsplash.com/photo-1543512214-318c7553f230",
        description:
            "Smart speaker with Alexa voice assistant support.",
        category: "Smart Gadgets",
        stock: 14,
    },
    {
        name: "OnePlus 12",
        price: 64999,
        image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        description:
            "Flagship OnePlus smartphone with ultra-smooth display.",
        category: "Mobiles",
        stock: 15,
    },

    {
        name: "iPad Air",
        price: 59999,
        image:
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
        description:
            "Powerful Apple tablet for work and entertainment.",
        category: "Tablets",
        stock: 9,
    },

    {
        name: "Samsung Galaxy Tab",
        price: 34999,
        image:
            "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9",
        description:
            "Android tablet with immersive display experience.",
        category: "Tablets",
        stock: 12,
    },

    {
        name: "Kitchen Air Fryer",
        price: 7999,
        image:
            "https://images.unsplash.com/photo-1585515656171-7d5c4d2d6d67",
        description:
            "Healthy cooking appliance with low oil technology.",
        category: "Kitchen",
        stock: 11,
    },

    {
        name: "Coffee Maker Machine",
        price: 5999,
        image:
            "https://images.unsplash.com/photo-1517701550927-30cf4ba1f864",
        description:
            "Automatic coffee machine for perfect coffee every day.",
        category: "Kitchen",
        stock: 13,
    },

    {
        name: "Modern Table Lamp",
        price: 1999,
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        description:
            "Minimal modern lamp for bedroom and office decor.",
        category: "Home Decor",
        stock: 26,
    },

    {
        name: "Wall Art Frame",
        price: 1499,
        image:
            "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
        description:
            "Beautiful wall decoration frame for living room.",
        category: "Home Decor",
        stock: 19,
    },

    {
        name: "Wireless Charger",
        price: 1299,
        image:
            "https://images.unsplash.com/photo-1583394838336-acd977736f90",
        description:
            "Fast wireless charging pad compatible with smartphones.",
        category: "Accessories",
        stock: 35,
    },

    {
        name: "Portable Power Bank",
        price: 2499,
        image:
            "https://images.unsplash.com/photo-1609592806596-b43d7c4d1b6d",
        description:
            "10000mAh fast charging portable power bank.",
        category: "Accessories",
        stock: 22,
    },

    {
        name: "Bluetooth Smart Speaker",
        price: 3999,
        image:
            "https://images.unsplash.com/photo-1589003077984-894e133dabab",
        description:
            "Portable wireless speaker with crystal clear sound.",
        category: "Audio",
        stock: 17,
    },
];
const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        // OLD PRODUCTS DELETE
        await Product.deleteMany();

        console.log("Old Products Deleted");

        const finalProducts = [];

        // PRODUCTS REPEAT FOR LARGE STORE FEEL
        for (let i = 0; i < 4; i++) {
            products.forEach((p) => {
                finalProducts.push({
                    ...p,
                    name: `${p.name} ${i + 1}`,
                });
            });
        }

        // INSERT PRODUCTS
        await Product.insertMany(finalProducts);

        console.log("✅ AMAZON STYLE PRODUCTS INSERTED");

        mongoose.disconnect();

        process.exit();
    } catch (err) {
        console.log("Seed Error:", err);

        process.exit(1);
    }
};

seedDB();