const express=require('express');
const { getChatMessage } = require('../controllers/chat');
const { login,signUp } = require('../controllers/auth');
const router=express.Router();

router.get("/getmessage",getChatMessage);
router.post("/signUp",signUp)
router.post("/login",login)
module.exports=router;