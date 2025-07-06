const { updateSearchIndex } = require('../model/issuedbookmodel');
const libraraycardmodel = require('../model/librarycard')
const usermodel = require('../model/usermodel')


const librarycard = async (req, res) => {
  const userid = req.user?.id;
  console.log("User ID:", userid); // Debugging line to check user ID
  
  try{
    
  

  if (!userid) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const existingCard = await libraraycardmodel.findOne({ user: userid });
  if (existingCard) {
    return res.status(400).json({ message: "You already have a library card" });
  }

  const issuedOn = new Date();
  const cardnumber = "LIB" + Math.floor(100000 + Math.random() * 900000); 
  const expireOn = new Date(issuedOn);
  expireOn.setFullYear(expireOn.getFullYear() + 1); 

  const newCard = await libraraycardmodel.create({
    user: userid,
    cardnumber,
    issuedOn,
    expireOn,
    isActive: true,
    maxBooksAllowed: 3,
    currentlyIssued: 0
  });

  return res.status(201).json({ message: "Library card created successfully", card: newCard });
  }
  
  catch (error) {
    console.error("Error creating library card:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

};
 const renewcard = async(req,res)=>{
  try{
      const userid = req.user?.id
  if(!userid){

    return res.status(401).json({ message: "Unauthorized" });
  }
  const card = await libraraycardmodel.findOne({user:userid})
  if(!card){
    return res.status(404).json({ message: "Library card not found" });
  }
  const currentdate = new Date();
  if(card.expireOn > currentdate && card.isActive){
    return res.status(400).json({ message: "Your library card is still active and does not need renewal" });
  }  

  const newexpiron = new Date(currentdate);
  newexpiron.setFullYear(newexpiron.getFullYear() + 1); 
  card.expireOn = newexpiron
  card.isActive = true
  await card.save()

  return res.status(200).json({ message: "Library card renewed successfully", card });
}

catch (error) {
    console.error("Error renewing library card:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { librarycard, renewcard };


 