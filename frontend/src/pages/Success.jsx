import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, total, name } = location.state || {};

  return (
    <div className="receipt-container">
      <div className="receipt-card">
        <div className="success-icon">🎉</div>
        <h1>Order Placed Successfully!</h1>
        <p className="thank-you">Thank you for your order, {name || "Customer"}!</p>
        
        {orderId ? (
          <div className="receipt-details">
            <div className="detail-row">
              <span>Order ID</span>
              <strong>#{orderId}</strong>
            </div>
            <div className="detail-row">
              <span>Total Amount</span>
              <strong>₹{total}</strong>
            </div>
          </div>
        ) : (
          <p className="no-details">No active order details found.</p>
        )}

        <p className="whatsapp-note">
          A confirmation message has been sent to your WhatsApp number.
        </p>

        <button className="home-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}