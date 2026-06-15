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
      minHeight: "100vh",
      backgroundColor: "#f7f3ee",
      padding: "40px 20px",
    }}
  >
    {/* Header */}
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: "#3b2412",
          fontSize: "42px",
          margin: 0,
          fontWeight: "700",
        }}
      >
        📋 Admin Dashboard
      </h1>

      <button
        onClick={() => {
          localStorage.removeItem("adminAuth");
          window.location.href = "/admin-login";
        }}
        style={{
          backgroundColor: "#4b2e19",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Logout
      </button>
    </div>

    {/* Orders */}
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "20px",
      }}
    >
      {orders.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          No orders found.
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "24px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            <h2
              style={{
                color: "#4b2e19",
                marginBottom: "15px",
              }}
            >
              Order #{order.id}
            </h2>

            <p>
              <strong>Customer:</strong> {order.customer_name}
            </p>

            <p>
              <strong>Phone:</strong> {order.phone}
            </p>

            <p>
              <strong>Total:</strong> ₹{order.total_amount}
            </p>

            <p>
              <strong>Payment:</strong> {order.payment_status}
            </p>

            <p>
              <strong>Status:</strong> {order.order_status}
            </p>
          </div>
        ))
      )}
    </div>
  </div>
);
}