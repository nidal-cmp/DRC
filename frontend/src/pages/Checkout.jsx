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

  const [loading, setLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("online");

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

const placeOrder = async () => {
  setLoading(true);
  try {
    if (!name.trim()) {
  alert("Please enter your name");
  setLoading(false);
  return;
}

if (!phone.trim()) {
  alert("Please enter your phone number");
  setLoading(false);
  return;
}
    if (paymentMethod === "cod") {
  try {
    const res = await fetch(
      "https://drc-lpet.onrender.com/api/order",
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
          payment_status: "COD",
          order_status: "received",
          instructions,
        }),
      }
    );

    const data = await res.json();

    clearCart();

    navigate("/success", {
      state: {
        orderId: data.order_id,
        total,
        name,
      },
    });

    return;
  } catch (error) {
    console.error(error);
    setLoading(false);
    alert("Failed to place COD order");
    return;
  }
}
    const orderRes = await fetch(
      "https://drc-lpet.onrender.com/api/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
        }),
      }
    );

    const order = await orderRes.json();





if (!order.id) {
  alert("Order ID not received from Railway");
  setLoading(false);
  return;
}


const options = {
  key: "rzp_test_SzrPUC4Fnaau5P",
  amount: order.amount,
  currency: order.currency,
  name: "Order Direct",
  description: "Food Order",
  order_id: order.id,

  handler: async function (response) {
    console.log("Payment Success:", response);

    const res = await fetch(
      "https://drc-lpet.onrender.com/api/order",
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
          payment_status: "Online",
          order_status: "received",
          instructions,
        }),
      }
    );

    const data = await res.json();

    clearCart();

    navigate("/success", {
      state: {
        orderId: data.order_id,
        total,
        name,
      },
    });
  },

  modal: {
    ondismiss: function () {
      console.log("Payment popup closed");
    },
  },

  theme: {
    color: "#4B2E1E",
  },
};



if (!window.Razorpay) {
  alert("Razorpay SDK failed to load");
  setLoading(false);
  return;
}



const rzp = new window.Razorpay(options);

rzp.on("payment.failed", function (response) {
  console.log("Payment Failed Details:", response);

  alert("Payment Failed. Please try again.");
});
   

rzp.open();



  } catch (error) {
  console.error("Payment Error:", error);

  setLoading(false);

  alert(
    JSON.stringify(
      error?.message ||
      error?.error ||
      error,
      null,
      2
    )
  );
}
};

  return (

    <div className="checkout-container">

      {/* Customer Details */}

      <div className="checkout-form">

        <h1>

          Checkout

        </h1>

        <h3>

          Customer Details

        </h3>

        <input
          value={name}
          placeholder="Full Name"
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          value={phone}
          placeholder="Phone Number"
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <textarea
          value={instructions}
          placeholder="Special Instructions"
          onChange={(e) =>
            setInstructions(
              e.target.value
            )
          }
        />

      </div>


      {/* Order Summary */}

      <div className="order-summary">

        <h2>

          Order Summary

        </h2>

        {

          cart.length === 0 ?

          <p>

            Your cart is empty.

          </p>

          :

          <>

            {

              cart.map((item) => (

                <div
                  key={item.id}
                  className="summary-item"
                >

                  <span>

                    {item.name}
                    {" "}
                    ×
                    {" "}
                    {item.quantity}

                  </span>

                  <span>

                    ₹
                    {
                      item.price *
                      item.quantity
                    }

                  </span>

                </div>

              ))

            }

            <hr />

            <div
              className="summary-total"
            >

              <h2>

                Total

              </h2>

              <h2>

                ₹{total}

              </h2>

            </div>
           <h3 style={{ marginTop: "20px" }}>
  Payment Method
</h3>

<div style={{ marginBottom: "20px" }}>
  <label>
    <input
      type="radio"
      value="online"
      checked={paymentMethod === "online"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    Online Payment
  </label>

  <br /><br />

  <label>
    <input
      type="radio"
      value="cod"
      checked={paymentMethod === "cod"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    Cash On Delivery
  </label>
</div>

            <button
              className="checkout-btn"
              onClick={placeOrder}
              disabled={loading}
            >

              {

                loading

                ?

                "Placing Order..."

                :

                "Place Order"

              }

            </button>

          </>

        }

      </div>

    </div>

  );

}