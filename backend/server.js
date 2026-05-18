const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const merchantRoutes = require("./routes/merchantRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { paymentWebhook } = require("./controllers/paymentController");
console.log("🔥 ORDER ROUTES LOADED");

require("dotenv").config();
connectDB();

const app = express();

app.use(cors());
app.post("/api/payment/webhook", express.raw({ type: "application/json" }), paymentWebhook);
app.use(express.json());


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/merchants", merchantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);



app.get("/", (req, res) => {
  res.send("BACKEND ACTIVE AND RUNNING");
});

app.get("/test", (req, res) => {
  res.send("Test working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;