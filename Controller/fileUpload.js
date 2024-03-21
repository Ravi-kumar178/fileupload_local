//import model
const File = require("../Models/Files");
const cloudinary = require("cloudinary").v2;


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

function isTypeSupported(type,supportedType){
    return supportedType.includes(type);
}

async function uploadToCloudinary(file,folder,quality){
    const options = {folder};
    options.quality = quality;
    console.log("type of options and folder", typeof(options), typeof(folder));
    options.resource_type = "auto";
    console.log(options);
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUploader = async(req,res) => {
    try{
        //fetch data
        const {name,tags,email} = req.body;
        //fetch image
        const file = req.files.imageFile;
        console.log("Files is: ",file);

        //validation
        const type = file.name.split(".")[1].toLowerCase();
        const supportedType = ["png","jpg","jpeg"];

        if(!isTypeSupported){
            return res.status(400).json({
                success:false,
                message:"This format is not supported"
            })
        }

        //supported
       const response =  await uploadToCloudinary(file,"Project");
       console.log("Response is: ",response);
       console.log(response.secure_url);

       //upload to db
       const saved = await File.create({
          name,
          email,
          tags,
          imageUrl : response.secure_url
       })

       res.status(200).json({
        success:true,
        message:"File Uploaded successfully"
       });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error in Uploading image"
        })
    }
}

exports.videoUploader = async(req,res) => {
    try{
        //fetch data
        const {name,email,tags} = req.body;
        //fetch file
        const file = req.files.videoFile;

        //validation
        const type = file.name.split(".")[1].toLowerCase();
        const supportedType = ["mov","mp4"];

        if(!isTypeSupported(type,supportedType)){
            return res.status(400).json({
                success:false,
                message:"File type not supported"
            })
        }

        //supported
        const response = await uploadToCloudinary(file,"Project");

        const save = await File.create({
            name,
            email,
            tags,
            videoUrl: response.secure_url
        });

        return res.status(200).json({
            success:true,
            message:"Video uploaded successfully"
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error in Uploading video"
        })
    }
}

exports.compressImage = async(req,res) => {
    try{
        //fetch data
        const {name, email,tags} = req.body;
        //fetch file
        const file = req.files.imageFile;

        //validation
        const type = file.name.split(".")[1].toLowerCase();
        const supportedType = ["png","jpg","jpeg"];

        if(!isTypeSupported){
            return res.status(400).json({
                success:false,
                message:"File Format not supported"
            })
        }

        //supported
        const response = await uploadToCloudinary(file,"Project",80);

        //save to db
        const save = await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url
        });

        return res.status(200).json({
            success:true,
            message:"Image compressed and uploaded successfully"
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Unable to compress and upload file"
        })
    }
}