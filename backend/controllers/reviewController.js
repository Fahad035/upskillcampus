const Review = require("../models/Review");

// 🟢 ADD REVIEW
exports.addReview = async (req, res) => {
  try {
    const { merchantId, rating, comment } = req.body;

    const review = await Review.create({
      user: req.user.id,
      merchant: merchantId,
      rating,
      comment
    });

    res.json(review);

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ msg: "You already reviewed this merchant" });
    }
    res.status(500).json({ error: error.message });
  }
};

// GET REVIEWS BY MERCHANT
exports.getReviews = async (req, res) => {
  const reviews = await Review.find({ merchant: req.params.merchantId })
    .populate("user", "name");

  res.json(reviews);
};

// GET AVERAGE RATING
exports.getAverageRating = async (req, res) => {
  const result = await Review.aggregate([
    { $match: { merchant: new require("mongoose").Types.ObjectId(req.params.merchantId) } },
    {
      $group: {
        _id: "$merchant",
        avgRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  res.json(result[0] || { avgRating: 0, totalReviews: 0 });
};