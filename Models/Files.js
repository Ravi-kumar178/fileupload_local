const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
})

require("dotenv").config();
//post middleware
fileSchema.post("save", async function(docs){
   try{
        console.log("DOCS: ", docs);
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        //send mail now
       let info = await transporter.sendMail({
            from:"Full-Stack Er. - Ravi",
            to: docs.email,
            subject:"Your File Uploaded",
           
            html:`<h1>File Uploaded</h1> <p>view here: <a href ="${docs.imageUrl}">"${docs.imageUrl}"</a></p>`
        });
        console.log("INFO: ",info);
   }
   catch(err){
    console.log(err);
   }
})

module.exports = mongoose.model("File",fileSchema);