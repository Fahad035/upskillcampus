const User = require("../models/User");
const Merchant = require("../models/Merchant");
const Order = require("../models/Order");

// 🟢 GET ALL USERS
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// 🟢 GET ALL MERCHANTS
exports.getMerchants = async (req, res) => {
  const merchants = await Merchant.find();
  res.json(merchants);
};

// 🟢 GET ALL ORDERS
exports.getOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("customer", "name email")
    .populate("merchant", "businessName");

  res.json(orders);
};

// 🟢 DELETE USER
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User deleted" });
};

// 🟢 BLOCK USER
exports.toggleBlockUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  user.isBlocked = !user.isBlocked;

  await user.save();

  res.json({ msg: "User status updated", isBlocked: user.isBlocked });
};