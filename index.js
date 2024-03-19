const express = require("express");
const app = express();

//port 
require("dotenv").config();
const PORT = process.env.PORT;

//middleware
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload());

//cloudinary connection
const cloudinaryConnect = require("./config/Cloudinary");
cloudinaryConnect();

//database connection
const dbConnect = require("./config/Database");
dbConnect();

//mount
const upload = require("./routes/FileUpload");
app.use("/api/v1/upload",upload);

//app starting
app.listen(PORT,()=>{
    console.log(`App is started at ${PORT}`);
});