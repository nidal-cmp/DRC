import { useState } from "react";

export default function Signup() {

  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");

  return (

    <div className="page">

      <h1>Create Account</h1>

      <div className="card-box">

        <input
          className="auth-input"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
        />

        <button className="checkout-btn">
          Register
        </button>

      </div>

    </div>

  );

}