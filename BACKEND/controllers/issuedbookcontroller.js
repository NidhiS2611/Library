const issuedbookmodel = require('../model/issuedbookmodel')
const bookmodel = require('../model/bookmodel')
const usermodel = require('../model/usermodel')
const libraraycardmodel = require('../model/librarycard')
const { sendmail } = require('../service/mail')

const issueBook = async (req, res) => {
    try {
        const bookid = req.params.bookid;
        const userid = req.user?.id;

        if (!userid) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const card = await libraraycardmodel.findOne({ user: userid })
        if (!card) {
            return res.status(400).json({ message: 'You need to create a library card first' });
        }
        if (card.currentlyIssued >= card.maxBooksAllowed) {
            return res.status(400).json({ message: 'You have reached the maximum limit of issued books' });
        }
        if (!card.isActive) {
            return res.status(400).json({ message: 'Your library card is not active' });
        }

        const book = await bookmodel.findById(bookid);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const user = await usermodel.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (book.availablecopies <= 0) {
            return res.status(400).json({ message: 'No copies available' });
        }




        const issuedDate = new Date();
        const returnDate = new Date();
        returnDate.setDate(issuedDate.getDate() + 1);

        const newIssuedBook = await issuedbookmodel.create({
            user: userid,
            book: bookid,
            issueddate: issuedDate,
            returnDate: returnDate,
            card: card.id
        });
        card.currentlyIssued += 1
        await card.save()
      await bookmodel.findByIdAndUpdate(bookid, { $inc: { availablecopies: -1 } }, { new: true });


        if (!user.issuedbooks) {
            user.issuedbooks = [];
        }
        user.issuedbooks.push(newIssuedBook._id);
        await user.save();

        
        res.status(200).json({ message: 'Book issued successfully', issuedBook: newIssuedBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


const returnbook = async (req, res) => {
  try {
    const issuedbookid = req.params.issuedbookid;
    const userid = req.user?.id;

    if (!userid) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const issuedbook = await issuedbookmodel.findOne({
      _id: issuedbookid,
      user: userid,
      isreturned: false,
    });

    if (!issuedbook) {
      return res.status(404).json({ message: 'Book not issued or already returned' });
    }

    const returnDate = new Date(issuedbook.returnDate);
    const today = new Date();

    let fine = 0;
    if (today > returnDate) {
      const diffTime = today - returnDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      fine = diffDays * 10;
    }

    issuedbook.fine = fine;
    issuedbook.isreturned = true;
    await issuedbook.save();

    const card = await libraraycardmodel.findOne({ user: userid });
    card.currentlyIssued -= 1;
    await card.save();

    const book = await bookmodel.findByIdAndUpdate(
      issuedbook.book,
      { $inc: { availablecopies: 1 } },
      { new: true }
    );

    await usermodel.findByIdAndUpdate(userid, {
      $pull: { issuedbooks: issuedbook._id },
    });

    if (fine > 0) {
      const user = await usermodel.findById(userid);
      const message = `
--------------------------------------------
📖  LIBRARY DUES SLIP
--------------------------------------------
Book Title     : "${book.title}"

Returned On    : ${today.toDateString()}
Fine Amount    : ₹${fine}
Remarks        : Book returned late.
--------------------------------------------
Please visit the library to settle your dues.

Thank you,
Library Admin
`;
      await sendmail(user.email, book.title, message);
      return res.status(200).json({ message: 'Book returned successfully with fine', fine: fine });
    }

    return res.status(200).json({ message: 'Book returned successfully on time', fine: 0 });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { issueBook, returnbook };


