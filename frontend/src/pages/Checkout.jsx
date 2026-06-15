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
  try {

    const orderRes = await fetch(
      "https://drc-production-c919.up.railway.app/api/create-order",
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

    const options = {
      key: "rzp_test_SzrPUC4Fnaau5P",
      amount: order.amount,
      currency: order.currency,
      name: "Order Direct",
      description: "Food Order",
      order_id: order.id,

      handler: async function () {

        const res = await fetch(
          "https://drc-production-c919.up.railway.app/api/order",
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
              payment_status: "paid",
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

      theme: {
        color: "#4B2E1E",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.log(error);
    alert("Payment Failed");
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