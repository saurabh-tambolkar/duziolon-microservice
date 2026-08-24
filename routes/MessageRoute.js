const express = require("express");
const { MessageModel } = require("../models/MessageModel");
const router = express.Router();
const jwt =require("jsonwebtoken");
const extractUserId = require("../utils/Authenticate");

router.post("/send-message", async (req, res) => {
  try {
    // console.log(req)
    // let sender  = extractUserId(req)
    let { ticketId, receiver, message,sender } = req.body;
    console.log(ticketId, sender, receiver, message);
    let newMessage = new MessageModel({
      ticketId: ticketId,
      sender: sender,
      receiver: receiver,
      message: message,
    });
    await newMessage.save();

      const data = newMessage.toObject();

    // console.log("Message to emit:", data);

    const receiverSocketId = global.onlineUsers?.[receiver]; // store socket ids somewhere globally
    console.log(receiver,data,receiverSocketId)
    if (receiverSocketId) {
      global.io.to(receiverSocketId).emit("receiveMessage", data);
    } else {
      console.log("⚠️ Receiver not online:", receiver);
    }



    res.status(200).json(
      { message: `Message sent successfully to ${receiver}`, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(
      {
        message: `Failed to send message.`,
        error,
        success: false,
      }
    );
  }
});


router.get("/messages/isConnected/:receiver",async(req,res)=>{
  try {
    let {receiver} = req.params;
    let connected = global.onlineUsers[receiver]
    console.log(receiver,connected)
    res.status(200).json({message:"Status of receiver fetched",connected:connected ? true : false,success:true})
  } catch (error) {
    console.log(error)
    res.status(400).json({message:"Status of receiver cant be fetched",success:false})
  }
})

router.post("/messages/dummy/:receiver",async(req,res)=>{
  try {
    let {receiver} = req.params
    let data = "hello"
    const receiverSocketId = global.onlineUsers?.[receiver]; // store socket ids somewhere globally
    console.log(receiver,data,receiverSocketId)
    if (receiverSocketId) {
      global.io.to(receiverSocketId).emit("receiveMessage", data);
    } else {
      console.log("⚠️ Receiver not online:", receiver);
    }
    res.send("done")
  } catch (error) {
    console.log(error)
  }
})


router.put('/messages/mark-seen/:senderId/:userId',async(req,res)=>{
  try {
    // let userId = extractUserId(req)
    let {senderId,userId} = req.params
    console.log(`Marking msg as seen from ${senderId} to ${userId}`)
    let result = await MessageModel.updateMany(
      {
        sender:senderId,
        receiver:userId,
        seen:false,
      },
      {
        $set:{
          seen:true
        }
      }
    )

    const receiverSocketId = global.onlineUsers?.[senderId]; // store socket ids somewhere globally
    let data = {
      receiverId:userId
    }
    console.log(senderId,data,receiverSocketId)
    if (receiverSocketId) {
      global.io.to(receiverSocketId).emit("messagesSeen", data);
    } else {
      console.log("⚠️ Receiver not online:", senderId);
    }

    console.log(
      `Marked ${result.modifiedCount} messages as seen`
    );
    res.status(200).json({message:"Successfully marked messages seen",success:true,modifiedCount: result.modifiedCount})
  } catch (error) {
    console.log(error)
     res.status(401).json({message:"Unable to mark messages seen",success:false})
  }
})



router.get('/messages/:sender/:receiver',async(req,res)=>{
    try {
      // let receiver = extractUserId(req)
        let {sender,receiver} = req.params;
        console.log(sender,receiver)
        let messages = await MessageModel.find({
            $or:[
                {sender:sender,receiver:receiver},
                {sender:receiver,receiver:sender}
            ]
        }).sort({time:1})
        const groupedMessages = {};
        for(const msg of messages){
          const date = msg.date
          if(!groupedMessages[date]){
            groupedMessages[date] = []
          }
          groupedMessages[date].push(msg)
        }
        res.status(200).json({message:"Messages fetched successfully",messages:groupedMessages,success:true})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Can get messages right now",success:false})
    }
})

router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ message: "Please provide token" });
    }
    let jwtSecretKey = process.env.JWTSECRETKEY
    // Verify the token
    jwt.verify(token, jwtSecretKey, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Invalid token", err });
      }

      // Fetch the user from the database if token is valid
      try {
        const userId = decoded.user.id;
        res.status(200).json({
          message: "Token is valid",
          userId,
          success: true,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
