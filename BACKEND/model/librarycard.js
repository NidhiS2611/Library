const mongoose = require('mongoose')
 const librarayschema = new mongoose.Schema({

user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true   
  },
  cardnumber: {
    type: String,
    unique: true,
    required: true
  },
  issuedOn: {
    type: Date,
    default: Date.now,
    required: true
  },
  expireOn: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  maxBooksAllowed: {
    type: Number,
    default: 3
  },
  currentlyIssued: {
    type: Number,
    default: 0
  }
}, 
{ timestamps: true }
)

const libraraycardmodel = mongoose.model('librarycard',librarayschema)
module.exports = libraraycardmodel;

