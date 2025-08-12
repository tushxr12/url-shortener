const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(+ new Date() + 7*24*60*60*1000) // 7 days from now
  },
  clicks:{
    type: Number,
    default: 0
  }
});

urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Automatically delete expired URLs

module.exports = mongoose.model('Url', urlSchema);