const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["home", "beauty", "pet", "other"],
    default: "other"
  },
  description: String,
  services: [
    {
      name: String,
      description: String,
      price: Number,
      priceLabel: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Merchant", merchantSchema);