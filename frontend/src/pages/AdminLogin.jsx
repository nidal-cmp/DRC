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
      backgroundColor: "#f7f3ee",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    }}
  >
    <div
      style={{
        width: "420px",
        background: "#fff",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "#3b2412",
          fontSize: "42px",
          marginBottom: "10px",
        }}
      >
        🔐 Admin Login
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
          fontSize: "18px",
        }}
      >
        Sign in to access the dashboard
      </p>

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "1px solid #ddd",
          marginBottom: "20px",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#4b2e19",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          fontSize: "18px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  </div>
);
}