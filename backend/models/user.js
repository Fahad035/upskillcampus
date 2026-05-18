const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  role: {
    type: String,
    enum: ["customer", "merchant", "admin"],
    default: "customer"
  },

  isBlocked: {
    type: Boolean,
    default: false
  }

  ,
  resetPasswordToken: String,
  resetPasswordExpires: Date

}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);