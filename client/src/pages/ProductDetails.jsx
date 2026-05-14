import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API from "../config/api";

function ProductDetails({ addToCart, toggleWishlist, wishlist }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios
            .get(`${API}/api/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    if (!product) return <h2 style={{ padding: "40px", textAlign: "center" }}>Loading...</h2>;

    const oldPrice = Math.floor(product.price * 1.2);
    const isLiked = wishlist.find((w) => w._id === product._id);

    return (
        <div style={{
            padding: "40px 20px",
            background: "#f5f5f5",
            minHeight: "100vh"
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto",
                background: "white",
                borderRadius: "15px",
                padding: "40px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                display: "flex",
                gap: "50px",
                flexWrap: "wrap"
            }}>

                {/* LEFT - IMAGE */}
                <div style={{ flex: "1", minWidth: "300px", textAlign: "center" }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            width: "100%",
                            maxWidth: "500px",
                            height: "auto",
                            objectFit: "contain",
                            borderRadius: "12px",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                        }}
                    />
                </div>

                {/* RIGHT - DETAILS */}
                <div style={{ flex: "1", minWidth: "300px" }}>

                    {/* Discount Badge */}
                    <div style={{
                        background: "#e53935",
                        color: "white",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        display: "inline-block",
                        fontWeight: "bold",
                        marginBottom: "15px"
                    }}>
                        20% OFF
                    </div>

                    <h1 style={{ fontSize: "28px", marginBottom: "15px" }}>
                        {product.name}
                    </h1>

                    {/* Price Section */}
                    <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
                        <h2 style={{ color: "#388e3c", fontSize: "32px", margin: 0 }}>
                            ₹ {product.price}
                        </h2>
                        <h3 style={{
                            textDecoration: "line-through",
                            color: "#878787",
                            margin: 0,
                            fontSize: "22px"
                        }}>
                            ₹ {oldPrice}
                        </h3>
                    </div>

                    {/* Category & Stock */}
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Stock:</strong> <span style={{ color: product.stock > 5 ? "green" : "red" }}>{product.stock} left</span></p>

                    {/* Rating */}
                    <p style={{ fontSize: "22px", margin: "15px 0" }}>
                        ⭐⭐⭐⭐☆ <span style={{ fontSize: "16px" }}>(4.5)</span>
                    </p>

                    {/* Description */}
                    <div style={{
                        marginTop: "20px",
                        lineHeight: "1.7",
                        color: "#333",
                        fontSize: "16px"
                    }}>
                        {product.description}
                    </div>

                    {/* Buttons */}
                    <div style={{
                        marginTop: "35px",
                        display: "flex",
                        gap: "15px",
                        flexWrap: "wrap"
                    }}>
                        <button
                            onClick={() => addToCart(product)}
                            style={{
                                padding: "14px 28px",
                                background: "#ff9900",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "17px",
                                fontWeight: "bold",
                                flex: 1
                            }}
                        >
                            Add to Cart
                        </button>

                        <button
                            onClick={() => toggleWishlist(product)}
                            style={{
                                padding: "14px 28px",
                                background: isLiked ? "#e53935" : "#f5f5f5",
                                color: isLiked ? "white" : "black",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "17px",
                                fontWeight: "bold",
                                flex: 1
                            }}
                        >
                            ❤️ {isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;