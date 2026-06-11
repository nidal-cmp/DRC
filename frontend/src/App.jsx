import { useState, useEffect, useRef } from "react"



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

  background: "#f3f4f6",

  fontFamily: "'Segoe UI', sans-serif",

  maxWidth: "1200px",

  width: "100%",

  margin: "0 auto",

},

  header: {

  background: "linear-gradient(135deg,#0f766e,#14b8a6)",

  padding: "24px",

  position: "sticky",

  top: 0,

  zIndex: 100,

  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",

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

  background: "#fff",

  padding: "18px",

  marginBottom: "14px",

  borderRadius: "16px",

  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",

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

  background: colors.primary,

  color: "#fff",

  border: "none",

  borderRadius: "10px",

  padding: "10px 18px",

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

    maxWidth: "1200px",

    background: colors.white,

    borderTop: `1px solid ${colors.border}`,

    padding: "12px 16px",

    boxSizing: "border-box",

  },

  checkoutBtn: {

  width: "100%",

  background: "linear-gradient(135deg,#0f766e,#14b8a6)",

  color: "#fff",

  border: "none",

  borderRadius: "12px",

  padding: "16px",

  fontSize: "16px",

  fontWeight: "bold",

  cursor: "pointer",

},

  checkoutSection: {

    padding: "20px 16px 120px",

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

  const checkoutRef = useRef(null)



  useEffect(() => {

    fetch("/menu.json")

      .then(res => res.json())

      .then(data => setMenuItems(data))

  }, [])



  useEffect(() => {

    if (showCheckout && checkoutRef.current) {

      checkoutRef.current.scrollIntoView({ behavior: "smooth", block: "start" })

    }

  }, [showCheckout])



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



  const handleCheckoutClick = () => {

    setShowCheckout(true)

  }



  // Sends order to backend API

  const handlePlaceOrder = async () => {

  setError("")



  // Validation

  if (!form.name.trim()) {

    return setError("Please enter your name.")

  }



  if (!/^[6-9]\d{9}$/.test(form.phone)) {

    return setError("Please enter a valid 10-digit mobile number.")

  }



  if (Object.keys(cart).length === 0) {

    return setError("Your cart is empty.")

  }



  setLoading(true)



  try {

    // Get first item from cart

    const firstItemId = Object.keys(cart)[0]



    const item = menuItems.find(

      m => String(m.id) === String(firstItemId)

    )



    const payload = {

      customer_name: form.name.trim(),

      product_name: item.name,

      quantity: cart[firstItemId]

    }



    const res = await fetch(

      "http://localhost:5000/api/orders",

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify(payload)

      }

    )



    if (!res.ok) {

      throw new Error("Server error")

    }



    await res.json()



    alert("Order placed successfully!")



    setCart({})

    setShowCheckout(false)



    setForm({

      name: "",

      phone: ""

    })



  } catch (err) {

    console.error(err)

    setError("Could not place order. Please try again.")

  } finally {

    setLoading(false)

  }

}



  return (

    <div style={styles.app}>

      {/* Header */}

      <div style={styles.header}>

        <p style={styles.headerTitle}>🍽️ Direct Restaurant Ordering</p>

<p style={styles.headerSub}>

Fresh Food • Fast Service • No Extra Charges

</p>

      </div>

      <div

  style={{

    margin: "20px",

    background: "#fff",

    borderRadius: "20px",

    padding: "30px",

    textAlign: "center",

    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"

  }}

>

  <h1>Welcome to Our Restaurant</h1>



  <p>

    Scan • Order • Pay • Enjoy

  </p>

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

          <button style={styles.checkoutBtn} onClick={handleCheckoutClick}>

            Proceed to Checkout · ₹{totalAmount}

          </button>

        </div>

      )}



      {/* Checkout form — only shows when showCheckout is true */}

      {showCheckout && (

        <div ref={checkoutRef} style={styles.checkoutSection}>

          <div

  style={{

    background: "#fff",

    padding: "16px",

    borderRadius: "12px",

    marginBottom: "20px",

    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"

  }}

>

  <h3>Order Summary</h3>



  {Object.entries(cart).map(([itemId, qty]) => {

    const item = menuItems.find(

      m => String(m.id) === String(itemId)

    )



    return (

      <p key={itemId}>

        {item.name} × {qty}

      </p>

    )

  })}



  <strong>Total ₹{totalAmount}</strong>

</div>

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