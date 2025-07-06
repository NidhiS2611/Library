const nodemailer = require('nodemailer');


const sendmail = async(email,book,message)=>{
    try{
        const transporter = await nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'nidhikalpana555@gmail.com',
                pass:'xsawolsybkcbeaeh'
            }
        })

        const mailoption = {
            from:'nidhikalpana555@gmail.com',
            to:email,
            subject:'book issued',
            text:`${message}`
        }


        await transporter.sendMail(mailoption,(err,info)=>{
            if(err){
                console.log(err);
                return false;
            }
            else{
                console.log('email sent successfully',info.response);
                return true;
            } 
        })

    }


    catch(error){
        console.log(error);
        return res.status(500).json({message:'internal server error'})
    }
}

 module.exports = {sendmail}
 