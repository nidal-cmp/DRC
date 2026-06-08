import { useState, useEffect } from "react"

// Style variables — consistent design tokens used throughout
const colors = {
  primary: "#0d9488",
  primaryLight: "#ccfbf1",
  white: "#ffffff",
  bg: "#f8fafb",
  text: "#1a1a1a",
  subtext: "#6b7280",
  border: "#e5e7eb",
  error: "#dc2626",
}

const styles = {
  app: {
    minHeight: "100vh",
    background: colors.bg,
    fontFamily: "'Segoe UI', sans-serif",
    maxWidth: "480px",
    margin: "0 auto",
  },
  header: {
    background: colors.primary,
    padding: "16px 20px",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: colors.white,
    margin: 0,
  },
  headerSub: {
    fontSize: "12px",
    color: colors.primaryLight,
    margin: "2px 0 0 0",
  },
  tabs: {
    display: "flex",
    gap: "8px",
    padding: "12px 16px",
    overflowX: "auto",
    background: colors.white,
    borderBottom: `1px solid ${colors.border}`,
  },
  tab: (active) => ({
    padding: "6px 16px",
    borderRadius: "20px",
    border: `1px solid ${active ? colors.primary : colors.border}`,
    background: active ? colors.primary : colors.white,
    color: active ? colors.white : colors.subtext,
    fontSize: "13px",
    fontWeight: active ? "bold" : "normal",
    cursor: "pointer",
    whiteSpace: "nowrap",
  }),
  menuList: {
    padding: "12px 16px",
    paddingBottom: "80px",
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: `1px solid ${colors.border}`,
  },
  itemName: {
    fontSize: "15px",
    fontWeight: "600",
    color: colors.text,
    margin: "0 0 4px 0",
  },
  itemDesc: {
    fontSize: "12px",
    color: colors.subtext,
    margin: "0 0 4px 0",
  },
  itemPrice: {
    fontSize: "14px",
    color: colors.primary,
    fontWeight: "bold",
    margin: 0,
  },
  addBtn: {
    background: colors.white,
    color: colors.primary,
    border: `1px solid ${colors.primary}`,
    borderRadius: "8px",
    padding: "6px 16px",
    fontSize: "13px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  qtyControl: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: colors.primaryLight,
    borderRadius: "8px",
    padding: "4px 10px",
  },
  qtyBtn: {
    background: "transparent",
    border: "none",
    color: colors.primary,
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  qtyNum: {
    fontSize: "14px",
    fontWeight: "bold",
    color: colors.primary,
    minWidth: "16px",
    textAlign: "center",
  },
  totalBar: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "480px",
    background: colors.white,
    borderTop: `1px solid ${colors.border}`,
    padding: "12px 16px",
    boxSizing: "border-box",
  },
  checkoutBtn: {
    width: "100%",
    background: colors.primary,
    color: colors.white,
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  checkoutSection: {
    padding: "20px 16px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: colors.text,
    margin: "0 0 14px 0",
  },
  input: {
    width: "100%",
    border: `1px solid ${colors.border}`,
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "14px",
    marginBottom: "12px",
    boxSizing: "border-box",
    outline: "none",
    color: colors.text,
    background: colors.white,
  },
  errorMsg: {
    color: colors.error,
    fontSize: "13px",
    marginBottom: "10px",
  },
  placeOrderBtn: (loading) => ({
    width: "100%",
    background: loading ? "#5eada6" : colors.primary,
    color: colors.white,
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: loading ? "not-allowed" : "pointer",
  }),
}

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

const orderResponse = await fetch("/api/payment/create-order", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    amount: totalAmount
  })
})

const orderData = await orderResponse.json()

const options = {
  key: "YOUR_RAZORPAY_KEY_ID",
  amount: orderData.order.amount,
  currency: orderData.order.currency,
  order_id: orderData.order.id,
  name: "Order Direct",
  description: "Food Order",
  handler: async function (response) {
    alert("Payment Successful!")

    setCart({})
    setShowCheckout(false)
    setForm({ name: "", phone: "" })
  },
  prefill: {
    name: form.name,
    contact: form.phone
  },
  theme: {
    color: "#0d9488"
  }
}

const razorpay = new window.Razorpay(options)
razorpay.open()

    } catch (err) {
      setError("Could not place order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.app}>
      {/* Header */}
      <div style={styles.header}>
        <p style={styles.headerTitle}>🍽 Order Direct</p>
        <p style={styles.headerSub}>No platform. No commission. Just food.</p>
      </div>

      {/* Category tabs */}
      <div style={styles.tabs}>
        {categories.map(cat => (
          <button
            key={cat}
            style={styles.tab(activeCategory === cat)}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu items */}
      <div style={styles.menuList}>
        {filteredItems.map(item => (
          <div key={item.id} style={styles.menuItem}>
            <div>
              <p style={styles.itemName}>{item.name}</p>
              <p style={styles.itemDesc}>{item.description}</p>
              <p style={styles.itemPrice}>₹{item.price}</p>
            </div>

            {/* Show ADD button or quantity controls depending on cart */}
            {!cart[item.id] ? (
              <button style={styles.addBtn} onClick={() => addToCart(item.id)}>ADD</button>
            ) : (
              <div style={styles.qtyControl}>
                <button style={styles.qtyBtn} onClick={() => removeFromCart(item.id)}>−</button>
                <span style={styles.qtyNum}>{cart[item.id]}</span>
                <button style={styles.qtyBtn} onClick={() => addToCart(item.id)}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sticky checkout bar — appears when cart has items */}
      {totalAmount > 0 && (
        <div style={styles.totalBar}>
          <button style={styles.checkoutBtn} onClick={() => setShowCheckout(true)}>
            Proceed to Checkout · ₹{totalAmount}
          </button>
        </div>
      )}

      {/* Checkout form — only shows when showCheckout is true */}
      {showCheckout && (
        <div style={styles.checkoutSection}>
          <p style={styles.sectionTitle}>Your Details</p>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleFormChange}
          />
          <input
            style={styles.input}
            type="tel"
            name="phone"
            placeholder="WhatsApp Number"
            value={form.phone}
            onChange={handleFormChange}
            maxLength={10}
          />

          {/* Show error message if validation fails */}
          {error && <p style={styles.errorMsg}>{error}</p>}

          {/* Place Order button — triggers API call */}
          <button
            style={styles.placeOrderBtn(loading)}
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : `Place Order · ₹${totalAmount}`}
          </button>
        </div>
      )}
    </div>
  )
}
