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
router.get('/admindashboard', authmiddle, authroll('admin'), async (req, res) => {
  try {
    // 1️⃣ Active aur Deactive user count
    const activeUsers = await usermodel.countDocuments({ role: 'user', isActive: true });
    const deactiveUsers = await usermodel.countDocuments({ role: 'user', isActive: false });

    // 2️⃣ Books month wise group
    const booksByMonth = await bookmodel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Month names
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    // 0-count wale months bhi include karo
    const booksByMonthFormatted = monthNames.map((name, index) => {
      const monthData = booksByMonth.find(b => b._id === index + 1);
      return {
        month: name,
        count: monthData ? monthData.count : 0
      };
    });

    // 3️⃣ Issued aur Returned books
    const totalIssuedBooks = await issuedbookmodel.countDocuments({ isreturned: false });
    const totalReturnedBooks = await issuedbookmodel.countDocuments({ isreturned: true });

    // 4️⃣ Total fine sum
    const totalFineAggregate = await issuedbookmodel.aggregate([
      { $match: { isreturned: true } },
      { $group: { _id: null, total: { $sum: "$fine" } } }
    ]);
    const totalFine = totalFineAggregate[0]?.total || 0;

    // Final response
    res.status(200).json({
      users: {
        active: activeUsers,
        deactive: deactiveUsers
      },
      booksByMonth: booksByMonthFormatted,
      issuedBooks: totalIssuedBooks,
      returnedBooks: totalReturnedBooks,
      totalFine
    });
  } catch (err) {
    console.log('error in fetching dashboard data', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router

