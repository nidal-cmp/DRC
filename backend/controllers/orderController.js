// Return all orders
const getOrders = (req, res) => {
    res.json([]);
};

// Create a new order
const createOrder = (req, res) => {
    res.json({
        success: true,
        message: "Order created successfully"
    });
};

module.exports = {
    getOrders,
    createOrder
};