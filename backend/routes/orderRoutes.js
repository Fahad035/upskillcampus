const express = require("express");
const router = express.Router();

const {
  createOrder,
  createPaidOrder,
  getMyOrders,
  getOrderById,
  getMerchantOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

// CREATE ORDER
router.post("/", authMiddleware, createOrder);
// CREATE PAID ORDER
router.post("/paid", authMiddleware, createPaidOrder);

// CUSTOMER ORDERS
router.get("/my", authMiddleware, getMyOrders);
// MERCHANT ORDERS
router.get("/merchant", authMiddleware, getMerchantOrders);

// ORDER DETAILS
router.get("/:id", authMiddleware, getOrderById);

// UPDATE STATUS
router.put("/:id", authMiddleware, updateOrderStatus);

module.exports = router;