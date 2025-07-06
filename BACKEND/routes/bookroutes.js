const express = require('express')
const router = express.Router()
const authmiddle = require('../middleware/authmiddle')
const{authroll} = require('../middleware/authroll')
const {createbook,updatebooks,deletebook } = require('../controllers/bookcontroller')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload  = multer({storage:storage})

router.post('/addbook',upload.single('image'),authmiddle,authroll('admin'), createbook )
router.post('/updatebook/:bookid',authmiddle,authroll('admin'),updatebooks)
router.delete('/deletebook/:bookid',authmiddle,authroll('admin'),deletebook)

module.exports = router

