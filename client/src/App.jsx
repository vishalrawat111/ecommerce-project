import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

function App() {
  // 🔐 USER AUTH STATE
  const [user, setUser] = useState(null);

  // 🛒 CART STATE
  const [cart, setCart] = useState([]);

  // ❤️ WISHLIST STATE
  const [wishlist, setWishlist] = useState([]);

  // 🔍 SEARCH STATE
  const [search, setSearch] = useState("");

  // ➕ ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p._id === product._id);

      if (exists) {
        return prev.map((p) =>
          p._id === product._id
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ➖ REMOVE FROM CART
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // ❤️ WISHLIST TOGGLE
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p._id === product._id);

      if (exists) {
        return prev.filter((p) => p._id !== product._id);
      }

      return [...prev, product];
    });
  };

  return (
    <BrowserRouter>

      {/* 🌐 NAVBAR */}
      <Navbar
        user={user}
        cart={cart}
        wishlist={wishlist}
        search={search}
        setSearch={setSearch}
      />

      <Routes>

        {/* 🏠 HOME */}
        <Route
          path="/"
          element={
            <Home
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
              search={search}
            />
          }
        />

        {/* 🔐 LOGIN */}
        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        {/* 🛒 CART */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />

        {/* ❤️ WISHLIST */}
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          }
        />

        {/* 📦 PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          }
        />

        {/* 💳 CHECKOUT */}
        <Route
          path="/checkout"
          element={<Checkout cart={cart} />}
        />

        {/* 🧾 ORDERS */}
        <Route
          path="/orders"
          element={<Orders />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;