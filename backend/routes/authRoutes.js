const express = require("express");
const { register, login, forgotPassword, resetPassword } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/check", (req, res) => {
  res.send("Auth working");
});

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;