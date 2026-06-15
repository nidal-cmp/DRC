const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Razorpay = require("razorpay");


const orderRoutes = require("./routes/orderRoutes");
const db = require("./utils/db");

const app = express();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Restaurant Ordering API Running");
});

app.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create Razorpay order",
    });
  }
});
app.use("/api/order", orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});