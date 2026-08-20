const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    seen: {
      type: Boolean,
      default: false,
    },
    date:{
      type:String,
     default: () => {
      const now = new Date();

      const day = now.getDate();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      return `${day}/${month}/${year}`;
    },
    },
    time:{
      type:Date,
      default:Date.now
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = { MessageModel };