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

    if (!product) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

    const isLiked = wishlist.find((w) => w._id === product._id);

    return (
        <div style={{ padding: "20px", display: "flex", gap: "30px" }}>

            {/* IMAGE */}
            <div>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                        width: "300px",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "10px"
                    }}
                />
            </div>

            {/* DETAILS */}
            <div style={{ maxWidth: "500px" }}>
                <h1>{product.name}</h1>

                <h2 style={{ color: "green" }}>₹ {product.price}</h2>

                <p style={{ marginTop: "10px" }}>
                    {product.description}
                </p>

                {/* ⭐ STATIC RATING */}
                <p style={{ marginTop: "10px" }}>
                    ⭐⭐⭐⭐☆ (4.2)
                </p>

                {/* BUTTONS */}
                <div style={{ marginTop: "20px" }}>

                    <button
                        onClick={() => addToCart(product)}
                        style={{
                            padding: "10px 15px",
                            marginRight: "10px",
                            background: "#ff9900",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        Add to Cart
                    </button>

                    <button
                        onClick={() => toggleWishlist(product)}
                        style={{
                            padding: "10px 15px",
                            background: isLiked ? "red" : "#eee",
                            color: isLiked ? "white" : "black",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        ❤️ Wishlist
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ProductDetails;