import { useState, useEffect } from "react"

export default function App() {
  const [menuItems, setMenuItems] = useState([])
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    fetch("/menu.json")
      .then(res => res.json())
      .then(data => setMenuItems(data))
  }, [])

  const categories = ["All", ...new Set(menuItems.map(i => i.category))]
  const filteredItems = activeCategory === "All"
  ? menuItems
  : menuItems.filter(item => item.category === activeCategory)
  
  return (
    <div>
      <h1>Menu</h1>
  
      {/* Category tabs */}
      <div>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
  
    {/* Menu items */}
    {filteredItems.map(item => (
    <div key={item.id}>
    <h3>{item.name}</h3>
    <p>{item.description}</p>
    <p>₹{item.price}</p>
  </div>
))}
    </div>
  )
}