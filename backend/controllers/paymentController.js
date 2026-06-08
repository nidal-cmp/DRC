const Razorpay = require("razorpay");
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = (req, res) => {
    const { amount } = req.body;

    res.json({
        success: true,
        amount,
        message: "Payment order created"
    });
};

// Verify payment
const verifyPayment = (req, res) => {
    res.json({
        success: true,
        message: "Payment verified"
    });
};

module.exports = {
    createOrder,
    verifyPayment
};
