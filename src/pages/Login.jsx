import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../config/api";

function Login({ setUser }) {
    const [isRegister, setIsRegister] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    // 🔐 REAL LOGIN / REGISTER
    const handleSubmit = async () => {
        try {
            if (!form.email || !form.password) {
                alert("Email & Password required");
                return;
            }

            let res;

            if (isRegister) {
                // 🆕 REGISTER API
                res = await axios.post(`${API}/api/auth/register`, form);
                alert("Register Successful");
                setIsRegister(false);
                return;
            } else {
                // 🔐 LOGIN API
                res = await axios.post(`${API}/api/auth/login`, {
                    email: form.email,
                    password: form.password,
                });
            }

            // 💾 SAVE TOKEN
            localStorage.setItem("token", res.data.token);

            // 👤 SAVE USER
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            alert("Login Successful");

            // 🚀 REDIRECT
            navigate("/");
        } catch (err) {
            console.log(err);
            alert("Login/Register Failed");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f2f2f2",
            }}
        >
            <div
                style={{
                    width: "300px",
                    padding: "20px",
                    background: "white",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
            >
                <h2 style={{ textAlign: "center" }}>
                    {isRegister ? "Register" : "Login"}
                </h2>

                {/* NAME */}
                {isRegister && (
                    <input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        style={inputStyle}
                    />
                )}

                {/* EMAIL */}
                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    style={inputStyle}
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                    style={inputStyle}
                />

                {/* BUTTON */}
                <button onClick={handleSubmit} style={btnStyle}>
                    {isRegister ? "Register" : "Login"}
                </button>

                {/* TOGGLE */}
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "10px",
                        cursor: "pointer",
                        color: "blue",
                    }}
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister
                        ? "Already have account? Login"
                        : "Create new account"}
                </p>
            </div>
        </div>
    );
}

export default Login;

// 🎨 STYLES
const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
};

const btnStyle = {
    width: "100%",
    padding: "10px",
    background: "#ff9900",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
};