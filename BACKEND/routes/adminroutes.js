const  express = require('express')
const router = express.Router()
const usermodel = require('../model/usermodel')

const { getallbooks } = require('../controllers/bookcontroller')
const authmiddle = require('../middleware/authmiddle')
const { authroll } = require('../middleware/authroll')
const {getalluser,userdetails,deleteuser,changepaassword} = require('../controllers/usercontrollers')

router.get('/getallbooks', authmiddle, authroll('admin'), getallbooks)
router.get('/getallusers', authmiddle, authroll('admin'), getalluser)
router.get('/user/:id',authmiddle,authroll('admin'),userdetails)
router.delete('/deleteuser/:id', authmiddle,authroll('admin') ,deleteuser);
router.put('/updatepassword',authmiddle, authroll('admin'), changepaassword)
router.get('/adminprofile',authmiddle,authroll('admin'),async(req,res)=>{
    const userid = req.user?.id
    
    
    if(!userid){    
        return res.status(400).json({message:"User ID not found"})
    }
    const user = await usermodel.findOne({_id:userid , role:'admin'})
    
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    res.status(200).json({message:"Admin profile fetched successfully", user})
})
module.exports = router