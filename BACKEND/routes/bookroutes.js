const express = require('express')
const router = express.Router()
const authmiddle = require('../middleware/authmiddle')
const{authroll} = require('../middleware/authroll')
const {createbook,updatebooks,deletebook } = require('../controllers/bookcontroller')
const upload = require('../utility/multer') // Import multer for file uploads



router.post('/addbook',upload.single('image'),authmiddle,authroll('admin'), createbook )
router.put('/updatebook/:bookid',authmiddle,authroll('admin'),updatebooks)
router.delete('/deletebook/:bookid',authmiddle,authroll('admin'),deletebook)

module.exports = router

