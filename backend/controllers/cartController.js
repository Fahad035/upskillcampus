const Cart = require("../models/Cart");
const Merchant = require("../models/Merchant");
const Order = require("../models/Order");

// 🟢 ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const { merchantId, serviceId } = req.body;

    const merchant = await Merchant.findById(merchantId);
    if (!merchant) {
      return res.status(404).json({ msg: "Merchant not found" });
    }

    const service = merchant.services.id(serviceId);
    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: []
      });
    }

    // prevent duplicates (same service)
    const exists = cart.items.find(
      (i) => i.serviceId.toString() === serviceId
    );

    if (exists) {
      return res.status(400).json({ msg: "Service already in cart" });
    }

    cart.items.push({
      merchantId,
      serviceId,
      name: service.name,
      price: service.price
    });

    await cart.save();

    res.json({ msg: "Added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🟢 GET CART
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  res.json(cart || { items: [] });
};

// 🟢 REMOVE ITEM
exports.removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) return res.status(404).json({ msg: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item._id.toString() !== req.params.itemId
  );

  await cart.save();

  res.json({ msg: "Item removed", cart });
};

// 🟢 CHECKOUT (Cart → Orders)
exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    const orders = [];

    for (let item of cart.items) {
      const order = await Order.create({
        customer: req.user.id,
        merchant: item.merchantId,
        service: {
          name: item.name,
          price: item.price
        }
      });

      orders.push(order);
    }

    // clear cart after checkout
    cart.items = [];
    await cart.save();

    res.json({
      msg: "Checkout successful",
      orders
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};