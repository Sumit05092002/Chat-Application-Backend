const chatSchema=require('../model/chatSchema');

exports.handleChatMessage=async(socket,message,io)=>{
    try {
        const chat=new chatSchema({user:"user1",chat:message});
        await chat.save();

        socket.emit('chat message', { message, user: 'You' });

        // Broadcast the message to all other clients (excluding the sender)
        socket.broadcast.emit('chat message', { message, user: 'Other user' });

    } catch (error) {
        console.log(error);
    }
}

exports.getChatMessage=async(req,res)=>{
    try {
        const response=await chatSchema.find.sort({timeStamp:1});
        res.status(200).json({
            success:true,
            data:response,
            message:"Chats fetched successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server error",
        })
    }
}