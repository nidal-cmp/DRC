import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://drc-production-c919.up.railway.app/api/order")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="order-history-page">
      <h1>Order History</h1>

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <div className="order-top">
            <h3>#{order.id}</h3>

            <span className={`status ${order.order_status}`}>
              {order.order_status}
            </span>
          </div>

          <p>{order.customer_name}</p>

          <h2>₹{order.total_amount}</h2>
        </div>
      ))}
    </div>
  );
}