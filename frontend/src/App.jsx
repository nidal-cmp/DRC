import { useState, useEffect } from "react"

export default function App() {
  const [menuItems, setMenuItems] = useState([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [cart, setCart] = useState({})
  useEffect(() => {
    fetch("/menu.json")
      .then(res => res.json())
      .then(data => setMenuItems(data))
  }, [])

  const categories = ["All", ...new Set(menuItems.map(i => i.category))]
  const filteredItems = activeCategory === "All"
  ? menuItems
  : menuItems.filter(item => item.category === activeCategory)
  // Calculate total amount by looping through cart items
const totalAmount = Object.entries(cart).reduce((sum, [itemId, qty]) => {
  const item = menuItems.find(m => m.id === itemId)
  return sum + item.price * qty
}, 0)
  // Adds one unit of an item to the cart
  const addToCart = (itemId) => {
  setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }))
  }
  // Removes one unit of an item from the cart
// If quantity reaches 0, removes the item entirely
const removeFromCart = (itemId) => {
  setCart(prev => {
    const updated = { ...prev }
    if (updated[itemId] > 1) {
      updated[itemId] -= 1
    } else {
      delete updated[itemId]
    }
    return updated
  })
}
  
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
    {/* Show total only if cart has items */}
{totalAmount > 0 && (
  <div>
    <p>Total: ₹{totalAmount}</p>
  </div>
)}

    {/* Show ADD button or quantity controls depending on cart */}
    {!cart[item.id] ? (
      <button onClick={() => addToCart(item.id)}>ADD</button>
    ) : (
      <div>
        <button onClick={() => removeFromCart(item.id)}>−</button>
        <span>{cart[item.id]}</span>
        <button onClick={() => addToCart(item.id)}>+</button>
      </div>
    )}
  </div>
))}
    </div>
  )
}