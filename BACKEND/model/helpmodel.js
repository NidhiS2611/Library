const { response } = require('express');
const mongoose = require('mongoose')
const helpSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    isresolved:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:['pending', 'resolved'],
        default:'pending'
    }, 
    response:{
        type:String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now

    }

})
 const helpmodel = mongoose.model('help',helpSchema)

module.exports = helpmodel;