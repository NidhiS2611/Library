const express = require('express')
const router = express.Router()
const bookmodel = require('../model/bookmodel')
const{getallbooks} = require('../controllers/bookcontroller')
const authmiddle = require('../middleware/authmiddle')
const { authroll } = require('../middleware/authroll')
const usermodel = require('../model/usermodel')
const issuedbookmodel = require('../model/issuedbookmodel')

router.get('/getallbooks', getallbooks)

router.get('/search', async (req, res) => {
  try {
    const search = req.query.search || "";

    const books = await bookmodel.find({
      $or: [
        { title: { $regex: `${search}`, $options: 'i' } },
        { category: { $regex: `${search}`, $options: 'i' } }
      ]
    });
      if(!books){
        return res.status(404).json({message:'no books found'})
      }
    
        res.json({ filterbooks: books });
        
        

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

})
router.get('/admindashboard', authmiddle,authroll('admin'), async (req,res)=> {
try{
const totalbooks = await bookmodel.countDocuments();
const totalusers = await usermodel.countDocuments({role: 'user'}); 
const totalissuedbooks = await issuedbookmodel.countDocuments({isreturned:false})
const totalreturnedbooks = await issuedbookmodel.countDocuments({isreturned:true})
const totalfineaggregate = await issuedbookmodel.aggregate([
  { $match: { isreturned: true } },
  { $group: { _id: null, total: { $sum: "$fine" } } }
])
const totalfine = totalfineaggregate[0]?.total || 0;


res.status(200).json({
  totalbooks,
  totalusers,
  totalissuedbooks,
  totalreturnedbooks,
  totalfine
});
}
catch(err){
  console.log('error in fetching', err);
  res.status(401).json({message: 'internal err'})
  
}

})


module.exports = router

