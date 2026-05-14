import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isLogin && !formData.name.trim()) {
            alert("Please enter your name");
            return;
        }
        if (!formData.email.trim()) {
            alert("Please enter email");
            return;
        }

        const userData = {
            name: formData.name.trim() || "User",
            email: formData.email.trim(),
            mobile: formData.mobile.trim()
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        alert(isLogin ? "✅ Login Successful!" : "✅ Account Created Successfully!");
        navigate("/");
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px"
        }}>
            <div style={{
                background: "white",
                padding: "40px 35px",
                borderRadius: "16px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                width: "100%",
                maxWidth: "420px"
            }}>
                <h2 style={{ textAlign: "center", marginBottom: "10px", fontSize: "28px" }}>
                    {isLogin ? "Welcome Back" : "Create New Account"}
                </h2>
                <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>
                    {isLogin ? "Sign in to your account" : "Join us today"}
                </p>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            style={inputStyle}
                            required={!isLogin}
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number (Optional)"
                        value={formData.mobile}
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <button type="submit" style={buttonStyle}>
                        {isLogin ? "Login" : "Create Account"}
                    </button>
                </form>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <span
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ color: "#ff9900", cursor: "pointer", fontWeight: "bold" }}
                    >
                        {isLogin ? "Create New Account" : "Already have an account? Login"}
                    </span>
                </div>
            </div>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none"
};

const buttonStyle = {
    width: "100%",
    padding: "14px",
    background: "#ff9900",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px"
};

export default Login;