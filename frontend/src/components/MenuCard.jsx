import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export default function MenuCard({ item }) {

  const { addToCart } = useCart();

  const {
    favorites,
    toggleFavorite
  } = useFavorites();

  const isFavorite =
    favorites.find(
      fav => fav.id === item.id
    );

  return (

    <div className="menu-card">

      {/* Food Image */}
      <img
        src={item.image}
        alt={item.name}
        className="food-image"
      />

      <div className="card-header">

        <div>

          <div
            className={
              item.type === "veg"
                ? "veg-dot"
                : "nonveg-dot"
            }
          ></div>

          <h3>{item.name}</h3>

        </div>

        <button
          className="favorite-btn"
          onClick={() =>
            toggleFavorite(item)
          }
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

      </div>

      {

        item.badge &&

        <div className="badge">

          {item.badge}

        </div>

      }

      <p className="description">

        {item.description}

      </p>

      <h3>

        ₹{item.price}

      </h3>

      <button
        className="add-btn"
        onClick={() =>
          addToCart(item)
        }
      >

        Add to Cart

      </button>

    </div>

  );

}