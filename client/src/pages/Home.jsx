import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config/api";

function Home({ addToCart, toggleWishlist, wishlist, search }) {
    const [products, setProducts] = useState([]);

    // ⭐ RATING STATE
    const [ratings, setRatings] = useState({});

    useEffect(() => {
        axios
            .get(`${API}/api/products`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, []);

    // 🔍 SAFE SEARCH FILTER
    const filteredProducts = products.filter((p) =>
        (p.name || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // ⭐ HANDLE RATING
    const handleRating = (productId, value) => {
        setRatings((prev) => ({
            ...prev,
            [productId]: value
        }));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>🛍️ Products</h2>

            {/* EMPTY STATE */}
            {filteredProducts.length === 0 && (
                <p>No products found 😢</p>
            )}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "15px",
                    marginTop: "20px",
                }}
            >
                {filteredProducts.map((p) => {
                    const isLiked = wishlist.find((w) => w._id === p._id);

                    return (
                        <div
                            key={p._id}
                            style={{
                                border: "1px solid #ddd",
                                padding: "10px",
                                borderRadius: "10px",
                            }}
                        >
                            <img
                                src={p.image}
                                alt={p.name}
                                style={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "cover",
                                }}
                            />

                            <h3>{p.name}</h3>
                            <p>₹ {p.price}</p>

                            {/* ⭐ RATING SYSTEM */}
                            <div style={{ margin: "5px 0" }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() =>
                                            handleRating(p._id, star)
                                        }
                                        style={{
                                            cursor: "pointer",
                                            fontSize: "18px",
                                            color:
                                                (ratings[p._id] || 0) >=
                                                    star
                                                    ? "gold"
                                                    : "gray",
                                        }}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>

                            {/* ❤️ Wishlist */}
                            <button
                                onClick={() => toggleWishlist(p)}
                                style={{
                                    background: isLiked
                                        ? "red"
                                        : "#eee",
                                    color: isLiked ? "white" : "black",
                                    marginRight: "10px",
                                }}
                            >
                                ❤️
                            </button>

                            {/* 🛒 Add to cart */}
                            <button onClick={() => addToCart(p)}>
                                Add to Cart
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;