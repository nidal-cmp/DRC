import { useState } from "react";

import menu from "../data/menu.json";

import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSideBar";
import CategorySidebar from "../components/CategorySidebar";
import SearchBar from "../components/SearchBar";
import VegToggle from "../components/VegToggle";
import MenuCard from "../components/MenuCard";


export default function Menu() {

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const filteredMenu = menu.filter((item) => {

    const categoryMatch =
      category === "All" ||
      item.category === category;

    const searchMatch =
      item.name.toLowerCase().includes(search.toLowerCase());

    const vegMatch =
      !vegOnly || item.type === "veg";

    return categoryMatch && searchMatch && vegMatch;
  });

  return (
    <>
      <Navbar />

      <div className="menu-layout">

        {/* Sidebar */}
        <aside className="left-panel">
          <CategorySidebar
            category={category}
            setCategory={setCategory}
          />
        </aside>

        {/* Main */}
        <main className="menu-center">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <VegToggle
            vegOnly={vegOnly}
            setVegOnly={setVegOnly}
          />

          <div className="menu-grid">

            {filteredMenu.length === 0 ? (
              <h2>No dishes found</h2>
            ) : (
              filteredMenu.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))
            )}

          </div>

        </main>

        {/* Cart */}
        <aside className="right-panel">
          <CartSidebar />
        </aside>

      </div>
    </>
  );
}