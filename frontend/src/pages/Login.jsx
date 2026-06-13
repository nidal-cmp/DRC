import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = () => {

    login({
      name,
      email,
      phone,
      points: 0
    });

    navigate("/");

  };

  return (

    <div className="page">

      <h1>Login</h1>

      <div className="card-box">

        <input
          className="auth-input"
          placeholder="Name"
          value={name}
          onChange={(e)=>
            setName(e.target.value)
          }
        />

        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />

        <input
          className="auth-input"
          placeholder="Phone"
          value={phone}
          onChange={(e)=>
            setPhone(e.target.value)
          }
        />

        <button
          className="checkout-btn"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>

  );

}