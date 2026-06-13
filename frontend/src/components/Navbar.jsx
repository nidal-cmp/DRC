import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {

  const { user, logout } = useAuth();
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (

    <nav className="navbar">

      <h2>

        Restaurant

      </h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/menu">Menu</Link>

        <Link to="/favorites">
          Favorites
        </Link>

        <Link to="/orders">
          Orders
        </Link>

        <Link to="/rewards">
          Rewards
        </Link>

        <Link to="/cart">
          Cart ({totalItems})
        </Link>

        {

          user ?

          <>

            <Link to="/profile">

              {user.name}

            </Link>

            <button className="auth-btn logout">
              Logout
            </button>

          </>

          :

          <Link to="/login">

            Login

          </Link>

        }

      </div>

    </nav>

  );

}