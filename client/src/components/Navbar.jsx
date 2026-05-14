import { Link } from "react-router-dom";

function Navbar({ user, cart, wishlist, search, setSearch }) {
    return (
        <nav style={styles.nav}>

            {/* LEFT - LOGO */}
            <Link to="/" style={styles.logo}>
                🛒 <span style={{ color: "#ff9900" }}>MyStore</span>
            </Link>

            {/* CENTER - SEARCH BAR */}
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search products, brands and more..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.search}
                />
            </div>

            {/* RIGHT - ICONS */}
            <div style={styles.right}>

                {/* Wishlist */}
                <Link to="/wishlist" style={styles.iconLink}>
                    ❤️ <span style={styles.count}>{wishlist.length}</span>
                </Link>

                {/* Cart */}
                <Link to="/cart" style={styles.iconLink}>
                    🛒 <span style={styles.count}>{cart.length}</span>
                </Link>

                {/* Account / Login */}
                <Link to={user ? "/profile" : "/login"} style={styles.account}>
                    <div style={styles.accountInner}>
                        <span style={{ fontSize: "24px" }}>👤</span>
                        <div style={{ lineHeight: "1.2" }}>
                            <small style={{ fontSize: "12px" }}>
                                {user ? "Hello," : "Hello, Sign in"}
                            </small>
                            <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                                {user ? user.name?.split(" ")[0] || "Account" : "Account"}
                            </div>
                        </div>
                    </div>
                </Link>

            </div>
        </nav>
    );
}

export default Navbar;

/* ==================== AMAZON STYLE STYLES ==================== */
const styles = {
    nav: {
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        backgroundColor: "#131921",
        color: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        width: "100%",
        boxSizing: "border-box",
        minHeight: "60px",
    },

    logo: {
        fontSize: "26px",
        fontWeight: "bold",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "white",
    },

    searchContainer: {
        flex: 1,
        maxWidth: "680px",
        margin: "0 25px",
    },

    search: {
        width: "100%",
        padding: "10px 16px",
        fontSize: "16px",
        border: "none",
        borderRadius: "6px",
        outline: "none",
        backgroundColor: "#fff",
        color: "#111",
    },

    right: {
        display: "flex",
        alignItems: "center",
        gap: "22px",
    },

    iconLink: {
        color: "white",
        textDecoration: "none",
        fontSize: "24px",
        position: "relative",
        padding: "6px 10px",
        transition: "0.2s",
    },

    count: {
        position: "absolute",
        top: "-6px",
        right: "-6px",
        background: "#ff9900",
        color: "#000",
        fontSize: "12px",
        fontWeight: "bold",
        borderRadius: "50%",
        padding: "1px 6px",
        minWidth: "18px",
        textAlign: "center",
        lineHeight: "1",
    },

    account: {
        color: "white",
        textDecoration: "none",
        padding: "6px 12px",
        borderRadius: "4px",
        transition: "0.2s",
    },

    accountInner: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
};
