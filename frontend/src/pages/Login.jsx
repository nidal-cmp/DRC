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

    <div className="login-page">

      <div className="login-card">

        <h1>

          Welcome Back 👋

        </h1>

        <p>

          Sign in to continue ordering

        </p>

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
          placeholder="Phone Number"
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