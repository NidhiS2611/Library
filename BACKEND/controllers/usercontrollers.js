const usermodel = require('../model/usermodel')
const { z } = require('zod')
const bcrypt = require('bcrypt')
const { generatetoken } = require('../utility/generatetoken')
const issuedbookmodel = require('../model/issuedbookmodel')
const bookmodel = require('../model/bookmodel')
const librarycardmodel = require('../model/librarycard')
const { librarycard } = require('./librarycardcontroller')
const { model } = require('mongoose')


const userschema = z.object({
  name: z.string().min(3, 'minimum 3 characters required').max(20, 'maximum 20 characters allowed'),
  email: z.string().email('invalid email'),
  password: z.string().min(6, 'minimum 6 characters required in password').max(20, 'maximum 20 characters allowed').refine((val => /[A-Z]/.test(val)), 'Password must contain at least one uppercase letter'),
  role: z.enum(['user', 'admin'], { message: 'Invalid role' })

})

const register = async (req, res) => {
  try {


    const { name, email, password, role } = req.body;
    console.log('registering user', req.body);

    const validation = userschema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: validation.error.issues[0].message });

    }

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }



    const user = await usermodel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (role === 'admin') {
      const admin = await usermodel.findOne({ role: 'admin' });
      if (admin) {
        return res.status(400).json({ message: 'Only one admin allowed' });
      }
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUser = await usermodel.create({
      name,
      email,
      password: hash,
      role
    })
    const token = await generatetoken(newUser)
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })


    return res.status(201).json({ message: 'User registered successfully', token })
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'internal server error' })
  }

}
const login = async (req, res) => {
  try {

    const { email, password } = req.body



    if (!email || !password) {
      return res.status(400).json({ message: 'all fields are required' })
    }

    const user = await usermodel.findOne({ email })


    if (!user) {
      return res.status(400).json({ message: 'User not find' })
    }
    const match = await bcrypt.compare(password, user.password)
    console.log(user.password);

    if (!match) {
      return res.status(400).json({ message: 'invalid credentials' })
    }
    const token = await generatetoken(user)
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None'
    })

    if (user.role === "admin") {
      return res.status(200).json({ message: 'login successfuland hello admin', token, role: 'admin' })
    }
    return res.status(200).json({
      message: 'login successful', token, user: {
        role: user.role,
        name: user.name,
        email: user.email
      }
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'internal error' })

  }
}

const getalluser = async (req, res) => {
  try {
    const users = await usermodel.aggregate([
      {
        $match: { role: 'user' },
      },
      {
        $lookup: {
          from: "librarycards",
          localField: "_id",
          foreignField: "user",
          as: "cardInfo"
        }
      },
      {
        $unwind: {
          path: "$cardInfo",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          status: {
            $cond: {
              if: {
                $and: [
                  { $ne: ["$cardInfo", null] },
                  { $eq: ["$cardInfo.isActive", true] }
                ]
              },
              then: "Active",
              else: "Inactive"
            }
          }
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          role: 1,
          "cardInfo.cardnumber": 1,
          status: 1
        }
      }
    ]);

    res.json(users);
  } catch (err) {
    console.error("Error in getalluser:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


const deleteuser = async (req, res) => {
  try {
    const userid = req.params.id
    if (!userid) {
      return res.status(400).json({ message: 'userid is required' })

    }
    const user = await usermodel.findByIdAndDelete(userid)
    if (user) {
      return res.status(200).json({ message: 'user deleted successfully' })
    }
    else {
      return res.status(404).json({ message: 'user not found' })

    }
  }

  catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'internal server error' })

  }
}

const returnedbook = async (req, res) => {
  const userid = req.user?.id;
  try {
    const returndbook = await issuedbookmodel.find({ user: userid, isreturned: true }).populate('book')
    if (returndbook.length === 0) {
      return res.status(404).json({ error: 'No returned books found' });
    }
    res.status(200).json({ message: 'returned books fetched successfully', returndbook })
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'internal server error' })
  }

}

const issuedbook = async (req, res) => {
  const userid = req.user?.id
  try {
    if (!userid) {
      return res.status(400).json({ error: 'userid is required' })


    }

    const issuedbook = await issuedbookmodel.find({ user: userid, isreturned: false }).populate('book')
    if (!issuedbook) {
      return res.status(404).json({ error: 'no books issued' })
    }


    res.status(200).json({ message: 'issued books fetched successfully', issuedbook })
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'internal server error' })
  }
}
const logout = async (req, res) => {
  try {
    res.clearCookie('token',{
       httpOnly: true,
      secure: true,         // ✅ required for HTTPS (Render)
      sameSite: 'None'

    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const updateuser = async (req, res) => {
  const userid = req.user?.id;
  const { name, email } = req.body;

  try {
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;


    if (req.file) {
      updateData.profile = req.file ? req.file.buffer : null
    }

    const updatedUser = await usermodel.findByIdAndUpdate(
      userid,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User updated successfully:', updatedUser);

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Something went wrong while updating' });
  }
};

const dashboard = async (req, res) => {
  const userid= req.user?.id
  try {
    const totalBooks = await bookmodel.countDocuments();

    const issuedBooks = await issuedbookmodel.countDocuments({
      isreturned: false,
      user:userid
    });

    const returnedBooks = await issuedbookmodel.countDocuments({
      isreturned: true,
      user:userid
    });

    const today = new Date();
    const overdueBooks = await issuedbookmodel.countDocuments({
      dueDate: { $lt: today },
      isreturned: false,
    user:userid
    });

    res.json({
      totalBooks,
      issuedBooks,
      returnedBooks,
      overdueBooks,
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard summary" });
  }
}

const profilesummary = async (req, res) => {
  try {
    const userid = req.user?.id
    if (!userid) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await usermodel.findById(userid)

    const issuedbook = await issuedbookmodel.find({ user: userid })

    const bookread = issuedbook.filter(book => book.isreturned).length
    const currentlyReading = issuedbook.filter(book => !book.isreturned).length
    const card = await librarycardmodel.findOne({ user: userid })

    res.status(200).json({
      name: user.name,
      email: user.email,
      joinedDate: user.createdAt,
      profile: user.profile,
      cardnumber: card?.cardnumber || null,
      stats: {
        bookread,
        currentlyReading,
        // static for now or calculate later
      }
    });

  } catch (err) {
    console.error("Profile summary error:", err);
    res.status(500).json({ err: "Failed to fetch profile summary" });
  }
}

const userdetails = async (req, res) => {
  try {
    const userid = req.params.id
    if (!userid) {


      return res.status(401).json({ message: "Unauthrised access" })
    }

    const user = await usermodel.findById(userid).populate({ path: 'issuedbooks', populate: { path: 'book', model: 'book' } })
    console.log(user.issuedbooks)

    const issued = user.issuedbooks.filter(b => !b.isreturned)
    const returnbook = await issuedbookmodel.find({ user: userid, isreturned: true }).populate('book')
    console.log('returned books', returnbook);




    const card = await librarycardmodel.findOne({ user: userid })

    const totalfine = returnbook.reduce((acc, cur) => acc + (cur.fine || 0), 0)
    res.json({ user, card, issuedbooks: issued, returnedbooks: returnbook, totalfine });

  }
  catch (err) {
    console.log('error', err)
    res.status(400).json({ error: "internal error" })
  }
}
const changepaassword = async (req, res) => {
  try {
    const userid = req.user?.id
    const { oldPassword, newPassword } = req.body
    console.log(oldPassword);

    if (!userid || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const user = await usermodel.findById(userid)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    ismatch = await bcrypt.compare(oldPassword, user.password)
    if (!ismatch) {
      return res.status(400).json({ message: "Old password is incorrect" })
    }

    const hashnewpassword = await bcrypt.hash(newPassword, 10);
    user.password = hashnewpassword
    await user.save();
    res.status(200).json({ message: "Password changed successfully" })



  } catch (err) {
    console.log('error in changing password', err);
    res.status(500).json({ message: 'internal server error' })
  }
}



module.exports = { register, login, getalluser, deleteuser, returnedbook, issuedbook, logout, dashboard, updateuser, profilesummary, userdetails, changepaassword }
