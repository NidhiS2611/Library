const bookmodel = require('../model/bookmodel')

const createbook = async(req,res)=>{
    try{
      const{title,author,category,isbn,totalcopies,availablecopies}  = req.body
       if(!title||!author || !category || !isbn || !totalcopies || !availablecopies){
        return res.status(400).json({error:'all fields are required'})
       }
       const book = await bookmodel.create({

        title,
        author,
        category,
        isbn,
        totalcopies,
        availablecopies,
        image: req.file ? req.file.buffer : null 
       })
       console.log(book);
       res.status(201).json({message:'book created successfully',book})
       

    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:'internal server error'})
        
    }
}


const getallbooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;         // Page number from query
    const limit = parseInt(req.query.limit) || 8;       // Books per page
    const skip = (page - 1) * limit;

    const books = await bookmodel.find().skip(skip).limit(limit);
    const totalBooks = await bookmodel.countDocuments();     // Total book count

    res.status(200).json({
      books,
      totalBooks,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


const updatebooks = async(req,res)=>{
   try{
 const  bookid = req.params.bookid
 if (!bookid) {
     return res.status(400).json({ error: 'bookid is required' });
 }
 const { title, author, category, totalcopies, availablecopies } = req.body;
 const book = await bookmodel.findByIdAndUpdate(bookid, {
     title, author, category, totalcopies, availablecopies
 }, { new: true });


        if(!book){
            return res.status(404).json({error:'book not found'})
        }
        res.status(200).json({message:'book updated successfully',book})
   }
   catch(err){
    console.log(err);
    return res.status(500).json({error:'internal server error'})
   }
}

const deletebook = async(req,res)=>{
    try{

        const bookid = req.params.bookid
        const book = await bookmodel.findByIdAndDelete(bookid)
        if(!book){
            return res.status(404).json({error:'book not found'})
        }

        res.status(200).json({message:'book deleted successfully',book})

    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:'internal server error'})


    }

}
module.exports = {createbook, getallbooks, updatebooks, deletebook}

