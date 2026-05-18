const express = require("express");
const router = express.Router();

const {
  addReview,
  getReviews,
  getAverageRating
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addReview);
router.get("/rating/:merchantId", getAverageRating);
router.get("/:merchantId", getReviews);

// test
router.get("/check/test", (req, res) => {
  res.send("Review routes working");
});

module.exports = router;