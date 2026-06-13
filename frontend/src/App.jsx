import { Routes, Route } from "react-router-dom";

import { useCart } from "./context/CartContext";
import Toast from "./components/Toast";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Rewards from "./pages/Rewards";
import Favorites from "./pages/Favorites";
import OrderHistory from "./pages/OrderHistory";
import NotFound from "./pages/NotFound";

function App() {

  const { toast } = useCart();

  return (
    <>
      {toast && <Toast message={toast} />}

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/orders" element={<OrderHistory />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;