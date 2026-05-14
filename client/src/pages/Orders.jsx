import { useEffect, useState } from "react";

function Orders() {
    const [orders, setOrders] = useState([]);

    // 📦 LOAD ORDERS FROM LOCALSTORAGE
    useEffect(() => {
        const savedOrders =
            JSON.parse(localStorage.getItem("orders")) || [];

        setOrders(savedOrders);
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>🧾 My Orders</h1>

            {orders.length === 0 ? (
                <h3>No orders placed yet 😢</h3>
            ) : (
                orders.map((order, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            marginBottom: "15px",
                            borderRadius: "10px",
                        }}
                    >
                        {/* ORDER INFO */}
                        <h3>Order #{index + 1}</h3>
                        <p>📅 {order.date}</p>
                        <p>📍 {order.address}</p>
                        <p>💳 Payment: {order.paymentMethod}</p>

                        {/* ITEMS */}
                        <div style={{ marginTop: "10px" }}>
                            {order.items.map((item) => (
                                <p key={item._id}>
                                    {item.name} × {item.qty}
                                </p>
                            ))}
                        </div>

                        {/* TOTAL */}
                        <h3>💰 Total: ₹ {order.total}</h3>
                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;