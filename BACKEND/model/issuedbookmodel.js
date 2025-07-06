const mongoose = require('mongoose')

const issuedbookschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'book'
    },
    issueddate:{
        type:Date,
    
    },
    returnDate:{
        type:Date
    },
    isreturned:{
        type:Boolean,
        default:false
    },
    fine:{
        type:Number,
        default:0
    }
    , 
    card:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'librarycard'
    }

})

const issuedbookmodel = mongoose.model('issuedbook', issuedbookschema)
module.exports = issuedbookmodel

