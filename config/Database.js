const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = () => {
    const url = process.env.DATABASE_URL;
    if(!url){
        console.log("Database url is not present");
    }

    mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{console.log("Database connected successfully")})
    .catch((err)=>{
        console.log("Error in database connection");
        console.log(err);
        process.exit(1);
    })
}

module.exports = dbConnect;