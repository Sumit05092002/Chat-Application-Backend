const mongoose=require('mongoose');
const chatSchema=require('../model/chatSchema')
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    chats:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:chatSchema
    }]
})

module.exports=mongoose.model("userSchema",userSchema);