const express = require('express')
const router = express.Router()
const authmiddle = require('../middleware/authmiddle')
const { librarycard } = require('../controllers/librarycardcontroller')
router.post('/createcard',authmiddle, librarycard)
  
module.exports = router
