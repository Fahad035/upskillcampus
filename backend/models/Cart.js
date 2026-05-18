const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
    required: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: String,
  price: Number
}, { _id: true });

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true, // one cart per user
    required: true
  },
  items: [cartItemSchema]
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);