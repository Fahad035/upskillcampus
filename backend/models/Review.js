const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String
  }
}, { timestamps: true });

// 🚨 Prevent duplicate reviews
reviewSchema.index({ user: 1, merchant: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);