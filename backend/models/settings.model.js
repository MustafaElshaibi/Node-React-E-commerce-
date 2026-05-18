const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, required: true, default: "So2qMart" },
  description: String,
  logo: String,
  contactEmail: String,
  contactPhone: Number,
  currency: String,
  workHours: [],
  socialMedia: {
    facebook: String,
    twitter: String
  },
  maintenanceMode: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);