const db = require("../utils/db");
const sendWhatsApp = require("../utils/whatsapp");

// Get orders (ALL or BY PHONE)
const getOrders = (req, res) => {
  const phone = req.query.phone;

  let sql = "SELECT * FROM orders";
  let params = [];

  if (phone) {
    sql += " WHERE phone = ?";
    params.push(phone);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Create new order
const createOrder = (req, res) => {
  const {
    customer_name,
    phone,
    items,
    total_amount,
    payment_status,
    order_status,
  } = req.body;

  const sql = `
    INSERT INTO orders 
    (customer_name, phone, items, total_amount, payment_status, order_status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      customer_name,
      phone,
      JSON.stringify(items),
      total_amount,
      payment_status || "pending",
      order_status || "received",
    ],
    async (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const order_id = result.insertId;

      try {
        await sendWhatsApp(phone, {
          customer_name,
          order_id,
          items,
          total_amount,
        });
      } catch (err) {
        console.log("WhatsApp failed:", err.message);
      }

      res.json({ success: true, order_id });
    }
  );
};

module.exports = { getOrders, createOrder };