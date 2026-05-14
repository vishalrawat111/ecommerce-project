import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config/api";
import { Link } from "react-router-dom";

function Home({ addToCart, toggleWishlist, wishlist, search }) {
    const [products, setProducts] = useState([]);
    const [ratings, setRatings] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        axios
            .get(`${API}/api/products`)
            .then((res) => {
                console.log("PRODUCTS LOADED:", res.data);
                setProducts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // Filter Logic
    const filteredProducts =
        search && search.trim() !== ""
            ? products.filter((p) =>
                (p.name || "").toLowerCase().includes(search.toLowerCase())
            )
            : selectedCategory === "All"
                ? products
                : products.filter((p) => p.category === selectedCategory);

    const handleRating = (productId, value) => {
        setRatings((prev) => ({ ...prev, [productId]: value }));
    };

    const categories = ["All", "Mobiles", "Laptops", "Audio", "Shoes", "Watches", "Gaming", "Cameras", "Fashion", "Home & Kitchen"];

    return (
        <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>

            {/* HERO BANNER */}
            <div style={{
                width: "100%",
                height: "620px",
                background: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000') center/cover no-repeat",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textAlign: "center"
            }}>
                <div>
                    <h1 style={{ fontSize: "62px", fontWeight: "700", marginBottom: "20px" }}>
                        Live Comfortably
                    </h1>
                    <p style={{ fontSize: "28px", marginBottom: "40px" }}>
                        Premium Shopping Experience
                    </p>
                    <a href="#products" style={{
                        background: "#ff9900",
                        color: "white",
                        padding: "18px 60px",
                        fontSize: "23px",
                        borderRadius: "50px",
                        textDecoration: "none",
                        fontWeight: "bold"
                    }}>
                        Shop Now
                    </a>
                </div>
            </div>

            {/* CATEGORIES - Clickable */}
            <div style={{ background: "white", padding: "25px 0", borderBottom: "1px solid #ddd" }}>
                <div style={{ maxWidth: "1480px", margin: "0 auto", display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
                    {categories.map((cat) => (
                        <div
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: "14px 32px",
                                background: selectedCategory === cat ? "#ff9900" : "#f8f9fa",
                                color: selectedCategory === cat ? "white" : "black",
                                borderRadius: "50px",
                                fontWeight: "600",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                transition: "0.3s",
                                boxShadow: selectedCategory === cat ? "0 4px 12px rgba(255,153,0,0.3)" : "none"
                            }}
                        >
                            {cat}
                        </div>
                    ))}
                </div>
            </div>

            {/* PRODUCTS SECTION */}
            <div id="products" style={{ padding: "40px 20px", maxWidth: "1480px", margin: "0 auto" }}>
                <h2 style={{ fontSize: "32px", marginBottom: "25px", textAlign: "center" }}>
                    {selectedCategory === "All" ? "All Products" : `${selectedCategory} Products`}
                </h2>

                <ProductGrid
                    products={filteredProducts}
                    addToCart={addToCart}
                    toggleWishlist={toggleWishlist}
                    wishlist={wishlist}
                    ratings={ratings}
                    handleRating={handleRating}
                />
            </div>
        </div>
    );
}

/* Product Grid Component */
function ProductGrid({ products, addToCart, toggleWishlist, wishlist, ratings, handleRating }) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "28px"
        }}>
            {products.length === 0 ? (
                <p style={{ textAlign: "center", gridColumn: "1 / -1", fontSize: "18px" }}>
                    No products found in this category 😢
                </p>
            ) : (
                products.map((p) => {
                    const isLiked = wishlist.find(w => w._id === p._id);
                    const oldPrice = Math.floor(p.price * 1.2);

                    return (
                        <div key={p._id} style={{
                            background: "white",
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            transition: "0.3s"
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-10px)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>

                            <Link to={`/product/${p._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <img src={p.image} alt={p.name} style={{ width: "100%", height: "280px", objectFit: "cover" }} />

                                <div style={{ padding: "16px" }}>
                                    <div style={{ background: "#e53935", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "13px", display: "inline-block", marginBottom: "10px" }}>
                                        20% OFF
                                    </div>
                                    <h3 style={{ fontSize: "17px", margin: "10px 0" }}>{p.name}</h3>

                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <span style={{ fontSize: "24px", fontWeight: "bold", color: "#388e3c" }}>₹{p.price}</span>
                                        <span style={{ textDecoration: "line-through", color: "#878787" }}>₹{oldPrice}</span>
                                    </div>
                                </div>
                            </Link>

                            {/* Rating */}
                            <div style={{ padding: "0 16px 8px" }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => handleRating(p._id, star)}
                                        style={{
                                            cursor: "pointer",
                                            fontSize: "22px",
                                            marginRight: "4px",
                                            color: (ratings[p._id] || 4) >= star ? "#ffa41c" : "#ddd",
                                        }}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div style={{ padding: "15px 16px", display: "flex", gap: "10px" }}>
                                <button onClick={() => toggleWishlist(p)} style={{ flex: 1, padding: "12px", background: isLiked ? "#e53935" : "#f5f5f5", color: isLiked ? "white" : "black", border: "none", borderRadius: "8px" }}>❤️</button>
                                <button onClick={() => addToCart(p)} style={{ flex: 2, padding: "12px", background: "#ff9900", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold" }}>Add to Cart</button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default Home;