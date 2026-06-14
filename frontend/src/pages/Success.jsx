import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

  const { cart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instructions, setInstructions] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {

    if (!name || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await fetch(
        "http://drc.up.railway.app/api/order",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            customer_name: name,
            phone,
            items: cart,
            total_amount: total,
            payment_status: "pending",
            order_status: "received",
            instructions
          }),
        }
      );

      const data = await res.json();

      navigate("/success", {
        state: {
          orderId: data.order_id,
          total,
          name
        }
      });

    } catch (err) {

      console.log(err);

      alert("Server Error");

    }

  };

  return (

    <div className="checkout-page">

      <h1>Checkout</h1>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />

      <textarea
        placeholder="Special Instructions"
        value={instructions}
        onChange={(e) =>
          setInstructions(e.target.value)
        }
      />

      <h2>Total: ₹{total}</h2>

      <button
        className="checkout-btn"
        onClick={placeOrder}
      >
        Place Order
      </button>

    </div>

  );

}