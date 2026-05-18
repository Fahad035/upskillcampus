const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  checkout
} = require("../controllers/cartController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/remove/:itemId", authMiddleware, removeFromCart);
router.post("/checkout", authMiddleware, checkout);

// test route
router.get("/check", (req, res) => {
  res.send("Cart routes working");
});

module.exports = router;