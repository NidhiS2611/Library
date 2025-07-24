const  express = require('express')
const router = express.Router()

const { getallbooks } = require('../controllers/bookcontroller')
const authmiddle = require('../middleware/authmiddle')
const { authroll } = require('../middleware/authroll')
const {getalluser,userdetails} = require('../controllers/usercontrollers')

router.get('/getallbooks', authmiddle, authroll('admin'), getallbooks)
router.get('/getallusers', authmiddle, authroll('admin'), getalluser)
router.get('/user/:id',authmiddle,authroll('admin'),userdetails)
module.exports = router