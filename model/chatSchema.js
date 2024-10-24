const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    chat:{
        type:String,
        required:true
    },
    timeStamp:{
        type:Date,
        default:Date.now,
    }
})

module.exports=new mongoose.model("chatSchema",chatSchema);