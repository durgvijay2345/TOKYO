const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ['critical', 'warning', 'info', 'success'], required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  actionable: { type: String },
  metrics: { type: mongoose.Schema.Types.Mixed }
}, { _id: false });

module.exports = insightSchema;
