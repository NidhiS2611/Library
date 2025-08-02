const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      enum: ['admin', 'user']
   },
   issuedbooks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'issuedbook'
   }],
  profile:Buffer,


   createdAt: {
      type: Date,
      default: Date.now
   },

   isActive: {
      type: Boolean,
      default: true
   },
     notificationPreferences: {
    method: {
      email: { type: Boolean, default: false },
      push: { type: Boolean, default: false }
    },
    triggers: {
      newBook: { type: Boolean, default: false },
      overdue: { type: Boolean, default: false }
    }
  },
  fcmToken: {
  type: String,
  default: "",
},






}, { timestamps: true }

)

const usermodel = mongoose.model('user', userschema)
module.exports = usermodel

