const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
    required: true
  },
  service: {
    name: String,
    price: Number
  },
  payment: {
    orderId: String,
    paymentId: String,
    signature: String,
    method: {
      type: String,
      default: 'razorpay'
    }
  },
  status: {
    type: String,
    enum: ["pending", "paid", "completed", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);