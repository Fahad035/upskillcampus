const express = require("express");
const router = express.Router();

const {
  getUsers,
  getMerchants,
  getOrders,
  deleteUser,
  toggleBlockUser
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// protect all routes
router.use(authMiddleware, adminOnly);

router.get("/users", getUsers);
router.get("/merchants", getMerchants);
router.get("/orders", getOrders);

router.delete("/user/:id", deleteUser);
router.put("/block/:id", toggleBlockUser);

// test
router.get("/check", (req, res) => {
  res.send("Admin routes working");
});

module.exports = router;