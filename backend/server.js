const express = require("express");
const cors = require("cors");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");
const db = require("./utils/db");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Restaurant Ordering API Running");
});


app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});