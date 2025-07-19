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
      ref: 'issuedbooks'
   }],
  profile:Buffer,


   createdAt: {
      type: Date,
      default: Date.now
   }





}, { timestamps: true }

)

const usermodel = mongoose.model('user', userschema)
module.exports = usermodel

