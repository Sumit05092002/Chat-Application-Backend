const userSchema=require('../model/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
require('dotenv').config();

// exports.signUp=async(req,res)=>{
//     try {
//         const {userName,email,password}=req.body;
//         const verify=userSchema.findOne({email});
//         if(!userName||!email||!password){
//             return res.status(400).json({
//                 success:false,
//                 message:"Bad Request"
//             })
//         }
//         if(verify){
//             return res.status(401).json({
//                 success:false,
//                 message:"USER already registered"
//             })
//         }
//         try {
//             const hashedPassword=bcrypt.hash(password,10);
//             const response=await userSchema.create({userName,email,password:hashedPassword});
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:"Error in Hashing"
//             })
//         }
//         res.status(200).json({
//             success:true,
//             data:response,
//             message:"USER registered successfully"
//         })

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success:false,
//             message:"Internal server error"
//         })
//     }
// }

exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"Bad Request"
            })
        }

        const user=await userSchema.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"USER not registered"
            })
        }
        if(await bcrypt.compare(password,user.password)){
            const payload={
                userName:user.userName,
                email:user.email
            }
            var token=jwt.sign(payload,process.env.JWT_SECRET)
        }else{
            return res.status(401).json({
                success:false,
                message:"Password Incorrect"
            })
        }
        res.status(200).json({
            success:true,
            data:token,
            message:"LoggedIn successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.signUp=async(req,res)=>{
    try {
        const {userName,email,password}=req.body;
        const checkmail=await userSchema.findOne({email});
        if(checkmail){
            return res.status(400).json({
                success:false,
                message:"user is already registered"
            })
    
        }
        let hashpassword;
        try {
            hashpassword= await bcrypt.hash(password,10);
        } catch (error) {
           return res.status(500).json({
                success:false,
                message:"Internal server error",
                data:error.message
            })
        }
    
        const response=await userSchema.create({userName,email,password:hashpassword})
        res.status(200).json({
            success:true,
            message:"Entry created successfully",
            data:response
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
            data:error.message
        })
    }
}

