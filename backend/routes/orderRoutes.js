const express = require("express");
const router = express.Router();

const {
    getOrders,
    createOrder
} = require("../controllers/orderController");

// GET all orders
router.get("/", getOrders);

// POST new order
router.post("/", createOrder);

module.exports = router;