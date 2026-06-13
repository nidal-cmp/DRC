import { useCart } from "../context/CartContext";
import EmptyState from "../components/EmptyState";

export default function Cart() {

  const {
    cart,
    clearCart,
    removeItem
  } = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (

    <div className="page">

      <h1>Your Cart</h1>

      {cart.length === 0 ? (

        <EmptyState text="Cart is Empty" />

      ) : (

        <>

          {cart.map(item => (

            <div
              key={item.id}
              className="card-box"
            >

              <h3>{item.name}</h3>

              <p>
                Qty: {item.quantity}
              </p>

              <p>
                ₹{item.price}
              </p>

              <button
                onClick={() =>
                  removeItem(item.id)
                }
              >
                Remove
              </button>

            </div>

          ))}

          <h2>Total: ₹{total}</h2>

          <button
            className="checkout-btn"
            onClick={clearCart}
          >
            Clear Cart
          </button>

        </>

      )}

    </div>

  );

}