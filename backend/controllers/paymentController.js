const Razorpay = require("razorpay");
const crypto = require("crypto");
const Merchant = require("../models/Merchant");
const Order = require("../models/Order");
const WebhookEvent = require("../models/WebhookEvent");

// CREATE ORDER
exports.createPaymentOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_order"
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// 🟢 VERIFY PAYMENT + SAVE ORDER
exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, merchantId, serviceId } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature !== expectedSign) {
    res.status(400).json({ msg: "Invalid payment" });
    return;
  }

  try {
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
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        method: 'razorpay',
      },
      status: 'paid',
    });

    res.json({ msg: 'Payment verified successfully', order });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// RAZORPAY WEBHOOK
exports.paymentWebhook = async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {
    return res.status(500).json({ msg: 'Webhook secret not configured' });
  }

  const body = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : JSON.stringify(req.body || {});
  const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');

  if (signature !== expectedSignature) {
    return res.status(400).json({ msg: 'Invalid webhook signature' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(body) : JSON.parse(body);
    const event = payload?.event;
    const payment = payload?.payload?.payment?.entity;

    await WebhookEvent.create({
      event: event || 'unknown',
      payload,
      signature,
      status: 'received',
    });

    if (event !== 'payment.captured' || !payment) {
      return res.json({ msg: 'Webhook received' });
    }

    await Order.findOneAndUpdate(
      { 'payment.paymentId': payment.id },
      {
        $set: {
          status: 'paid',
          payment: {
            paymentId: payment.id,
            orderId: payment.order_id,
            signature,
            method: 'razorpay',
          },
        },
      },
      { new: true }
    );

    await WebhookEvent.create({
      event,
      payload,
      signature,
      status: 'processed',
    });

    res.json({ msg: 'Webhook processed' });
  } catch (error) {
    await WebhookEvent.create({
      event: 'payment.webhook.error',
      payload: { body },
      signature,
      status: 'failed',
    }).catch(() => null);
    res.status(500).json({ msg: error.message });
  }
};