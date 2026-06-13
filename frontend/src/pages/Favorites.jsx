import { useFavorites } from "../context/FavoritesContext";
import MenuCard from "../components/MenuCard";

export default function Favorites() {

  const { favorites } = useFavorites();

  return (

    <div className="page">

      <h1>Favorites</h1>

      {favorites.length === 0 ? (

        <p>No favourite dishes yet.</p>

      ) : (

        <div className="menu-grid">

          {favorites.map((item) => (

            <MenuCard
              key={item.id}
              item={item}
            />

          ))}

        </div>

      )}

    </div>

  );

}