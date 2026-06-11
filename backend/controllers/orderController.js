const db = require("../utils/db");

// Get all orders
const getOrders = (req, res) => {
  db.query(
    "SELECT * FROM orders",
    (err, results) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json(results);
    }
  );
};

// Create new order
const createOrder = (req, res) => {

  const {
    customer_name,
    product_name,
    quantity
  } = req.body;

  const sql =
    `INSERT INTO orders
     (customer_name, product_name, quantity)
     VALUES (?, ?, ?)`;

  db.query(
    sql,
    [customer_name, product_name, quantity],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        success: true,
        order_id: result.insertId
      });
    }
  );
};

module.exports = {
  getOrders,
  createOrder
};