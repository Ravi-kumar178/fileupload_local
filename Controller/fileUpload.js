//import model
const File = require("../Models/Files");

exports.localFileUpload = async(req,res) =>{
    try{
        //fetch file
        const file = req.files.File;
        console.log("Files is: ",file);
        //fetch path
        const path = __dirname +"/ravi/" + Date.now() + `.${file.name.split(".")[1]}`;


        file.mv(path,()=>{
            try{
                console.log("File moved to directory successfully");
            }
            catch(err){
                console.log("Error while moving file to directory");
            }
        })

       /*  const response = await File.create({file}); */

        return res.status(200).json({
            success:true,
            message:"File uploaded successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "There is error in server side"
        })
    }
}