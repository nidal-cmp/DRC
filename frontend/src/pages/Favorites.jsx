import { useFavorites } from "../context/FavoritesContext";
import MenuCard from "../components/MenuCard";

export default function Favorites() {

  const { favorites } = useFavorites();

  return (

    <div className="favorites-page">

      <h1>

        Your Favorites ❤️

      </h1>

      {

        favorites.length === 0 ?

        <div className="empty-state">

          <h2>

            No favourite dishes yet ❤️

          </h2>

          <p>

            Tap the heart icon on menu items to save them.

          </p>

        </div>

        :

        <div className="favorites-grid">

          {

            favorites.map((item)=>(

              <MenuCard
                key={item.id}
                item={item}
              />

            ))

          }

        </div>

      }

    </div>

  );

}