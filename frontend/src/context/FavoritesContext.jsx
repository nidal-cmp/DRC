import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

  const [favorites, setFavorites] = useState(() => {

    const savedFavorites =
      localStorage.getItem("favorites");

    return savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

  }, [favorites]);

  const toggleFavorite = (item) => {

    const exists = favorites.find(
      (fav) => fav.id === item.id
    );

    if (exists) {

      setFavorites(
        favorites.filter(
          (fav) => fav.id !== item.id
        )
      );

    } else {

      setFavorites([
        ...favorites,
        item
      ]);

    }

  };

  return (

    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite
      }}
    >

      {children}

    </FavoritesContext.Provider>

  );

}

export function useFavorites() {

  return useContext(FavoritesContext);

}