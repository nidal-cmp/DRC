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
    <div style={{ padding: "40px" }}>
      <h1>Admin Login</h1>

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}