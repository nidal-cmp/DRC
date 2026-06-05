import { useState, useEffect } from "react"

export default function App() {
  const [menuItems, setMenuItems] = useState([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [cart, setCart] = useState({})
  const [form, setForm] = useState({ name: "", phone: "" })
  const [showCheckout, setShowCheckout] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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

  // Updates form state when user types in any input field
  const handleFormChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

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

  // Sends order to backend API
  const handlePlaceOrder = async () => {
    setError("")

    // Basic validation
    if (!form.name.trim()) return setError("Please enter your name.")
    if (!/^[6-9]\d{9}$/.test(form.phone)) return setError("Please enter a valid 10-digit mobile number.")
    if (Object.keys(cart).length === 0) return setError("Your cart is empty.")

    // Build order payload matching the data model
    const orderPayload = {
      customer_name: form.name.trim(),
      phone: form.phone.trim(),
      items: Object.entries(cart).map(([itemId, qty]) => {
        const item = menuItems.find(m => m.id === itemId)
        return {
          item_id: item.id,
          name: item.name,
          quantity: qty,
          unit_price: item.price
        }
      }),
      total_amount: totalAmount,
      payment_status: "pending",
      order_status: "received"
    }

    setLoading(true)

    try {
      const res = await fetch("https://your-backend-url.onrender.com/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload)
      })

      if (!res.ok) throw new Error("Server error")

      const data = await res.json()
      alert(`Order placed! Order ID: ${data.order_id}`)
      setCart({})
      setShowCheckout(false)
      setForm({ name: "", phone: "" })

    } catch (err) {
      setError("Could not place order. Please try again.")
    } finally {
      setLoading(false)
    }
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

      {/* Show total only if cart has items */}
      {totalAmount > 0 && (
        <div>
          <p>Total: ₹{totalAmount}</p>
        </div>
      )}

      {/* Checkout button — only shows when cart has items */}
      {totalAmount > 0 && (
        <button onClick={() => setShowCheckout(true)}>
          Proceed to Checkout
        </button>
      )}

      {/* Checkout form — only shows when showCheckout is true */}
      {showCheckout && (
        <div>
          <h2>Your Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleFormChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="WhatsApp Number"
            value={form.phone}
            onChange={handleFormChange}
            maxLength={10}
          />

          {/* Show error message if validation fails */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Place Order button — triggers API call */}
          <button onClick={handlePlaceOrder} disabled={loading}>
            {loading ? "Placing Order..." : `Place Order · ₹${totalAmount}`}
          </button>
        </div>
      )}
    </div>
  )
}