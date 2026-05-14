import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout({ cart }) {
    const navigate = useNavigate();

    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cod");

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // ================= RAZORPAY PAYMENT =================
    const handlePayment = async () => {
        if (!address.trim()) {
            alert("Please enter your delivery address");
            return;
        }

        if (paymentMethod === "cod") {
            placeCODOrder();
            return;
        }

        // Razorpay Payment
        try {
            setLoading(true);

            // Step 1: Backend se Order Create karo
            const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
                amount: total,
            });

            if (!data.success) {
                alert("Failed to create order");
                return;
            }

            // Step 2: Razorpay Options
            const options = {
                key: "rzp_test_SorQbuRg24Cbkt", // Test Key
                amount: data.order.amount,
                currency: "INR",
                name: "MyStore",
                description: "Order Payment",
                order_id: data.order.id,
                handler: async function (response) {
                    // Step 3: Payment Verify
                    try {
                        const verifyRes = await axios.post(
                            "http://localhost:5000/api/payment/verify-payment",
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }
                        );

                        if (verifyRes.data.success) {
                            alert("🎉 Payment Successful! Order Placed.");
                            saveOrderToLocal(response.razorpay_payment_id);
                            navigate("/orders");
                        } else {
                            alert("Payment verification failed");
                        }
                    } catch (err) {
                        console.error(err);
                        alert("Something went wrong during verification");
                    }
                },
                prefill: {
                    name: "Vishal",
                    email: "vishal@example.com",
                    contact: "9876543210",
                },
                theme: { color: "#e74c3c" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
            alert("Payment failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const placeCODOrder = () => {
        saveOrderToLocal("COD");
        alert("Order Placed Successfully (Cash on Delivery)");
        navigate("/orders");
    };

    const saveOrderToLocal = (paymentId) => {
        const order = {
            items: cart,
            total,
            address,
            paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment",
            paymentId: paymentId,
            date: new Date().toLocaleString(),
            status: "Placed",
        };

        const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];
        localStorage.setItem("orders", JSON.stringify([...oldOrders, order]));
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h1>🛒 Checkout</h1>

            {/* Address */}
            <div style={{ margin: "20px 0" }}>
                <h3>Delivery Address</h3>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="4"
                    style={{ width: "100%", padding: "10px" }}
                    placeholder="Enter full address with pincode..."
                />
            </div>

            {/* Payment Method */}
            <div style={{ margin: "20px 0" }}>
                <h3>Payment Method</h3>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ padding: "10px", fontSize: "16px" }}
                >
                    <option value="cod">💵 Cash on Delivery</option>
                    <option value="online">💳 Pay Online (Razorpay)</option>
                </select>
            </div>

            {/* Order Summary */}
            <div style={{ margin: "20px 0" }}>
                <h3>Order Summary</h3>
                {cart.map((item) => (
                    <p key={item._id}>
                        {item.name} × {item.qty} = ₹{item.price * item.qty}
                    </p>
                ))}
                <h2>Total Amount: ₹{total}</h2>
            </div>

            {/* Place Order Button */}
            <button
                onClick={handlePayment}
                disabled={loading}
                style={{
                    width: "100%",
                    padding: "15px",
                    fontSize: "18px",
                    background: loading ? "#ccc" : "#e74c3c",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: loading ? "not-allowed" : "pointer",
                }}
            >
                {loading ? "Processing..." : paymentMethod === "cod"
                    ? "Place COD Order"
                    : "Pay Now with Razorpay"}
            </button>
        </div>
    );
}

export default Checkout;