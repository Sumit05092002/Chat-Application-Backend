const jwt=require('jsonwebtoken');

exports.authMid=async(req,res,next)=>{
    try {
        const token=req.body.token;
        if(!token){
            return res.status(404).json({
                success:false,
                message:"Token not found"
            })
        }
        const user=jwt.verify(token,process.env.
            JWT_SECRET
        );
        req.user=user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}