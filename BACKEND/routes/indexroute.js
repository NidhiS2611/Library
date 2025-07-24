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
router.get('/admindashboard', async (req,res)=> {
try{
  const books = await bookmodel.find()
  if(!books){
    return res.status(404).json({message:'no books found'})
  }
  const users = await usermodel.find()
  const issuedbook = await issuedbookmodel.find({isreturned:false})
  const returnbook = await issuedbookmodel.find({isreturned:true})
   res.status(200).json({users,books,issuedbook,returnbook})
 
}

catch(err){
  console.log('error in fetching', err);
  res.status(401).json({message: 'internal err'})
  
}

})


module.exports = router

