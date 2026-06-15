import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {    
      alert("Wrong password");
    }
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
    }}
  >
    <div
      style={{
        width: "400px",
        padding: "30px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h1>🔐 Admin Login</h1>

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Login
      </button>
    </div>
  </div>
);
}