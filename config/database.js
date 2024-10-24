const mongoose=require('mongoose');

require('dotenv').config();
const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("connected to database successfully");
    })
    .catch((error)=>{
        console.log(error);
        console.log("Error connecting to database");
        process.exit(1);
    })
}

module.exports=dbConnect;