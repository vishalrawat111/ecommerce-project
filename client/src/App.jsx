import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from "axios"
import API from "./config/api"

function App() {
  const [count, setCount] = useState(0)

  // 🛒 NEW: products state
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`${API}/api/products`)
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => {
        console.log("Error fetching products:", err)
      })
  }, [])

  return (
    <>
      {/* ===== YOUR ORIGINAL UI (UNCHANGED) ===== */}
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>

        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      {/* ===== 🛒 NEW PRODUCT SECTION (ADDED BELOW YOUR UI) ===== */}
      <section style={{ padding: "30px" }}>
        <h2>🛒 Products from Backend</h2>

        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px"
          }}>
            {products.map((p) => (
              <div key={p._id} style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "10px"
              }}>
                <h3>{p.name}</h3>
                <p>₹ {p.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== REST YOUR ORIGINAL UI ===== */}
      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
        </div>

        <div id="social">
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App