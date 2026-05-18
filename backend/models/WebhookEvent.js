const mongoose = require('mongoose');

const webhookEventSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    default: 'razorpay',
  },
  payload: {
    type: Object,
    required: true,
  },
  signature: String,
  status: {
    type: String,
    enum: ['received', 'processed', 'failed'],
    default: 'received',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.models.WebhookEvent || mongoose.model('WebhookEvent', webhookEventSchema);