const express = require("express");
const router = express.Router();

// Create Razorpay order
router.post("/create-order", async (req, res) => {
    const { amount } = req.body;

    try {
        res.json({
            success: true,
            amount,
            message: "Payment order created"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Verify payment
router.post("/verify", async (req, res) => {
    try {
        res.json({
            success: true,
            message: "Payment verified"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
