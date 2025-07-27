 
const mongoose = require('mongoose')
const dotenv =require('dotenv')
const dbgr = require('debug')('app:db')
dotenv.config()

const mongouri = process.env.MONGODB_URI
console.log(mongouri);

mongoose.connect(mongouri)
.then(()=>{
   
    dbgr('MongoDB connected')
    console.log('connected  successfully');
}).catch((err)=>{
   
    dbgr('MongoDB connection error:', err)
})

module.exports = mongoose