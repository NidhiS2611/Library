 
const mongoose = require('mongoose')
const dotenv =require('dotenv')
const dbgr = require('debug')('app:db')
dotenv.config()

mongouri = process.env.MONGODB_URI
mongoose.connect(mongouri)
.then(()=>{
   
    dbgr('MongoDB connected')
    
}).catch((err)=>{
   
    dbgr('MongoDB connection error:', err)
})

module.exports = mongoose