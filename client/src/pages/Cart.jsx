import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, addToCart, removeFromCart }) {
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    // 💰 TOTAL CALCULATION
    useEffect(() => {
        const sum = cart.reduce((acc, item) => {
            return acc + item.price * item.qty;
        }, 0);

        setTotal(sum);
    }, [cart]);

    // ➖ DECREASE QTY
    const decreaseQty = (item) => {
        if (item.qty === 1) {
            removeFromCart(item._id);
        } else {
            addToCart({ ...item, qty: -1 });
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>🛒 My Cart</h1>

            {cart.length === 0 ? (
                <h3>Cart is empty 😢</h3>
            ) : (
                <>
                    {/* CART ITEMS */}
                    {cart.map((item) => (
                        <div
                            key={item._id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                border: "1px solid #ddd",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "10px",
                            }}
                        >
                            {/* IMAGE + INFO */}
                            <div style={{ display: "flex", gap: "10px" }}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                    }}
                                />

                                <div>
                                    <h3>{item.name}</h3>
                                    <p>₹ {item.price}</p>
                                </div>
                            </div>

                            {/* QTY CONTROLS */}
                            <div>
                                <button onClick={() => decreaseQty(item)}>-</button>
                                <span style={{ margin: "0 10px" }}>
                                    {item.qty}
                                </span>
                                <button onClick={() => addToCart(item)}>
                                    +
                                </button>
                            </div>

                            {/* REMOVE */}
                            <button
                                onClick={() => removeFromCart(item._id)}
                                style={{ color: "red" }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* TOTAL */}
                    <div
                        style={{
                            marginTop: "20px",
                            padding: "15px",
                            border: "2px solid green",
                            borderRadius: "10px",
                        }}
                    >
                        <h2>💰 Total: ₹ {total}</h2>

                        <button
                            onClick={() => navigate("/checkout")}
                            style={{
                                padding: "10px",
                                marginTop: "10px",
                                background: "orange",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            Proceed to Checkout 🧾
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;