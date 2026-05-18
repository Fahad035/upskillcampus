const Order = require("../models/Order");
const Merchant = require("../models/Merchant");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { merchantId, serviceId } = req.body;

    const merchant = await Merchant.findById(merchantId);

    const service = merchant.services.id(serviceId);

    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }

    const order = await Order.create({
      customer: req.user.id,
      merchant: merchantId,
      service: {
        name: service.name,
        price: service.price
      }
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPaidOrder = async (req, res) => {
  try {
    const { merchantId, serviceId, payment } = req.body;

    if (!merchantId || !serviceId) {
      return res.status(400).json({ msg: 'merchantId and serviceId are required' });
    }

    const merchant = await Merchant.findById(merchantId);
    if (!merchant) {
      return res.status(404).json({ msg: 'Merchant not found' });
    }

    const service = merchant.services.id(serviceId);
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    const order = await Order.create({
      customer: req.user.id,
      merchant: merchantId,
      service: {
        name: service.name,
        price: service.price,
      },
      payment: {
        orderId: payment?.razorpay_order_id,
        paymentId: payment?.razorpay_payment_id,
        signature: payment?.razorpay_signature,
        method: 'razorpay',
      },
      status: 'paid',
    });

    res.status(201).json({ msg: 'Paid order saved successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET CUSTOMER ORDERS
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ customer: req.user.id })
    .populate("merchant", "businessName");

  res.json(orders);
};

// GET ORDER BY ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("merchant", "businessName category description")
      .populate("customer", "name email role");

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    if (String(order.customer?._id) !== String(req.user.id) && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET MERCHANT ORDERS
exports.getMerchantOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("customer", "name email")
    .populate("merchant", "businessName");

  res.json(orders);
};

// UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    if (!req.body.status) {
      return res.status(400).json({ msg: "Status is required" });
    }

    order.status = req.body.status;

    await order.save();

    res.json({
      msg: "Order updated successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};