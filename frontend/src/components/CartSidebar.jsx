import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartSidebar() {

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem
  } = useCart();

  const total = cart.reduce(

    (sum, item) =>
      sum + item.price * item.quantity,

    0

  );

  return (

    <div className="cart-sidebar">

      <h2>Your Cart</h2>

      {

        cart.length === 0 ?

        <p>No items added.</p>

        :

        <>

          {

            cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <h4>
                  {item.name}
                </h4>

                <p>
                  ₹{item.price}
                </p>

                <div className="quantity-controls">

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            ))

          }

          <hr />

          <h3>
            Total: ₹{total}
          </h3>

          <Link to="/checkout">

            <button className="checkout-btn">
                Proceed to Checkout
            </button>

        </Link>

        </>

      }

    </div>

  );

}