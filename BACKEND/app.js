const express = require('express')
const db = require('./config/db')
const app = express()
const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:5173', // Allow frontend origin
  credentials: true               // Allow cookies / credentials
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
const userroutes = require('./routes/userroutes')
const authmiddle = require('./middleware/authmiddle')
const { authroll } = require('./middleware/authroll')
const bookroutes = require('./routes/bookroutes')
const issueBookroutes = require('./routes/issuedbookroutes')
const indexroutes = require('./routes/indexroute')
const librarayroutes = require('./routes/librarayroutes')
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use('/user', userroutes)
app.use('/book', bookroutes)
app.use('/issuedbook', issueBookroutes)
app.use('/', indexroutes)
app.use('/library', librarayroutes)
app.get('/', (req, res) => {
    res.send('hiii')
})

app.listen(process.env.PORT || 3000,'0.0.0.0', () => {
    console.log(`server is running on port ${process.env.PORT || 3000}`);
});


 