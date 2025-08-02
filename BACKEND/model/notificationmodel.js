const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // ✅ kis user ke liye notification hai
      required: true
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false // ✅ unread by default
    },
    type: {
      type: String,
      enum: ['book', 'system', 'reminder'], // tu aur types add kar sakta hai
      default: 'book'
    }
  },
  {
    timestamps: true // ✅ adds createdAt and updatedAt automatically
  }
);

const notificationmodel = mongoose.model('notification',notificationSchema)
  module.exports = notificationmodel