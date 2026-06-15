import { useEffect, useState } from "react";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://drc-production-c919.up.railway.app/api/order")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
  <div
    style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "20px",
      textAlign: "center",
    }}
  >
    <button
      onClick={() => {
        localStorage.removeItem("adminAuth");
        window.location.href = "/admin-login";
      }}
      style={{
        marginBottom: "20px",
        padding: "10px 20px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>

    <h1>📋 Orders Dashboard</h1>

    {orders.length === 0 ? (
      <p>No orders found.</p>
    ) : (
      orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "10px",
            textAlign: "left",
            background: "#fff",
          }}
        >
          <h3>Order #{order.id}</h3>

          <p><strong>Customer:</strong> {order.customer_name}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Total:</strong> ₹{order.total_amount}</p>
          <p><strong>Payment:</strong> {order.payment_status}</p>
          <p><strong>Status:</strong> {order.order_status}</p>
        </div>
      ))
    )}
  </div>
);
}