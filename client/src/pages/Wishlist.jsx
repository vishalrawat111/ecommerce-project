function Wishlist({ wishlist, toggleWishlist, addToCart }) {
    return (
        <div style={{ padding: "20px" }}>
            <h1>❤️ My Wishlist</h1>

            {wishlist.length === 0 ? (
                <h3>No items in wishlist 😢</h3>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "15px",
                        marginTop: "20px",
                    }}
                >
                    {wishlist.map((item) => (
                        <div
                            key={item._id}
                            style={{
                                border: "1px solid #ddd",
                                padding: "10px",
                                borderRadius: "10px",
                                position: "relative",
                            }}
                        >
                            {/* ❤️ REMOVE BUTTON */}
                            <button
                                onClick={() => toggleWishlist(item)}
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    background: "transparent",
                                    border: "none",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                    color: "red",
                                }}
                            >
                                ❌
                            </button>

                            {/* IMAGE */}
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "cover",
                                }}
                            />

                            {/* DETAILS */}
                            <h3>{item.name}</h3>
                            <p>₹ {item.price}</p>

                            {/* ADD TO CART */}
                            <button
                                onClick={() => addToCart(item)}
                                style={{
                                    marginTop: "10px",
                                    padding: "8px",
                                    width: "100%",
                                    background: "#ff9900",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Add to Cart 🛒
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Wishlist;