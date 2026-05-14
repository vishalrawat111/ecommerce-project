import { Link } from "react-router-dom";

function Navbar({ user, cart, wishlist, search, setSearch }) {
    return (
        <nav style={styles.nav}>

            {/* LEFT - LOGO */}
            <Link to="/" style={styles.logo}>
                🛒 MyStore
            </Link>

            {/* CENTER - SEARCH (CONNECTED TO APP STATE) */}
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.search}
            />

            {/* RIGHT - LINKS */}
            <div style={styles.right}>

                {/* WISHLIST */}
                <Link to="/wishlist" style={styles.link}>
                    ❤️ {wishlist.length}
                </Link>

                {/* CART */}
                <Link to="/cart" style={styles.link}>
                    🛒 {cart.length}
                </Link>

                {/* USER */}
                {user ? (
                    <span style={styles.user}>
                        👤 {user.name}
                    </span>
                ) : (
                    <Link to="/login" style={styles.login}>
                        Login
                    </Link>
                )}

            </div>
        </nav>
    );
}

export default Navbar;

/* 🎨 STYLE */
const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#131921",
        color: "white",
    },
    logo: {
        color: "white",
        fontSize: "20px",
        fontWeight: "bold",
        textDecoration: "none",
    },
    search: {
        width: "40%",
        padding: "8px",
        borderRadius: "5px",
        border: "none",
        outline: "none",
    },
    right: {
        display: "flex",
        gap: "15px",
        alignItems: "center",
    },
    link: {
        color: "white",
        textDecoration: "none",
        fontSize: "16px",
    },
    login: {
        color: "yellow",
        textDecoration: "none",
    },
    user: {
        color: "#00ffcc",
    },
};