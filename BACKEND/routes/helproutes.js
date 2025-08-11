const express = require('express')
const router = express.Router()
const {helpregister, deleterequest} = require('../controllers/helpcontroller')
const authmiddle = require('../middleware/authmiddle')
const {authroll} = require('../middleware/authroll')


router.post('/help', authmiddle, helpregister)
router.delete('/deletehelp/:id' , authmiddle, authroll('admin'), deleterequest)


module.exports = router