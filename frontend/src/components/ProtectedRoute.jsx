import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

  const { cart, clearCart } = useCart();

  const {
    user,
    setUser
  } = useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState(
    user?.name || ""
  );

  const [phone, setPhone] = useState(
    user?.phone || ""
  );

  const [instructions, setInstructions] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {

    setLoading(true);

    try {

      const res = await fetch(
        "https://drc-production-c919.up.railway.app/api/order",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            customer_name: name,
            phone,
            items: cart,
            total_amount: total,
            payment_status: "pending",
            order_status: "received",
            instructions
          })
        }
      );

      const data = await res.json();

      if (res.ok) {

        const pointsEarned =
          Math.floor(total / 10);

        if (user) {

          setUser({
            ...user,
            points:
              (user.points || 0)
              + pointsEarned
          });

        }

        clearCart();

        navigate("/success", {
          state: {
            orderId: data.order_id,
            total,
            name
          }
        });

      }

    }

    catch (err) {

      console.log(err);

      alert("Order failed");

    }

    setLoading(false);

  };

  return (

    <div className="checkout-page">

      <h1>Checkout</h1>

      <input
        value={name}
        placeholder="Name"
        onChange={(e)=>
          setName(e.target.value)
        }
      />

      <input
        value={phone}
        placeholder="Phone"
        onChange={(e)=>
          setPhone(e.target.value)
        }
      />

      <textarea
        value={instructions}
        placeholder="Special Instructions"
        onChange={(e)=>
          setInstructions(e.target.value)
        }
      />

      <h2>
        Total: ₹{total}
      </h2>

      <button
        className="checkout-btn"
        onClick={placeOrder}
        disabled={loading}
      >

        {
          loading
          ? "Placing Order..."
          : "Place Order"
        }

      </button>

    </div>

  );

}