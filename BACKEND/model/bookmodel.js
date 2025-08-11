const mongoose = require('mongoose');
const { create } = require('./usermodel');

const bookschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,

    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    totalcopies: {
        type: Number,
        required: true,
        default: 10
    },
    availablecopies: {
        type: Number,
        required: true,
        default: 10
    },
    image: Buffer,

    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})

const bookmodel = mongoose.model('book', bookschema)
module.exports = bookmodel;

