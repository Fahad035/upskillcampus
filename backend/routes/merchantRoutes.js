const express = require("express");
const router = express.Router();

const {
  createMerchant,
  getMerchants,
  getMerchant,
  addService,
  deleteService,
  updateService
} = require("../controllers/merchantController");

const authMiddleware = require("../middleware/authMiddleware");

// CREATE (Protected)
router.post("/", authMiddleware, createMerchant);

// GET ALL
router.get("/", getMerchants);

// GET ONE
router.get("/:id", getMerchant);

// ADD SERVICE
router.post("/service", authMiddleware, addService);

// DELETE SERVICE
router.delete("/service/:serviceId", authMiddleware, deleteService);

// UPDATE SERVICE
router.put("/service/:serviceId", authMiddleware, updateService);

module.exports = router;