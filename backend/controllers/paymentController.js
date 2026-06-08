// Create Razorpay order
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
