//import model
const File = require("../Models/Files");
const cloudinary = require("cloudinary").v2;
const { options } = require("../routes/FileUpload");

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

 function isFileTypeSupported(type,supportedType){
    return supportedType.includes(type);
 }

 async function uploadToCloudinary(file,folder){
    console.log("type of folder: ", typeof(folder));
    const options = {folder};
    options.resource_type = "auto";
    console.log("options: ", options);
    console.log("path of temp: ", file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath,options);
 }

exports.imageUploader = async(req,res) =>{
    try{
        const {name, tags, email} = req.body;
        console.log("name, tags, email" , name,tags,email);
        //fetch file
        const file = req.files.imageFile;
        console.log("File is:", file);

        //validation by image type
        const type = file.name.split(".")[1].toLowerCase();
        console.log("Type is: ",type);
        const supportedType = ["jpg","png","jpeg"];

        if(!isFileTypeSupported(type,supportedType)){
            return res.status(400).json({
                success:false,
                message:"File type not supported"
            });
        }

        console.log("file type supported");
        //file type supported then upload to cloudinary
        const response = await uploadToCloudinary(file,"Project");

        console.log("Uploaded to cloudinary: ", response);
        //save into db
        const saved = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url
        })

        //success flag
        return res.status(200).json({
            success:true,
            message:"Image uploaded successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something wrong in uploading image"
        })
    }
}