// const {Kafka} = require("kafkajs");
// let fs =  require("fs");
// const {sendMail} = require("../../utils/sendMail");

// require('dotenv').config();

// const kafka = new Kafka({
//   clientId: "mail-service",
//   brokers: [process.env.KAFKA_BROKER],
//   ssl: {
//     ca: [fs.readFileSync("./certs/ca.pem", "utf-8")],
//   },
//   sasl: {
//     mechanism: "plain",
//     username: process.env.KAFKA_USERNAME,
//     password: process.env.KAFKA_PASSWORD,
//   },
// });

// const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

// async function startConsumer(){
//     await consumer.connect();

//     await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: true });

//     console.log("Subscribed to order-placed");

//     await consumer.run({
//         eachMessage:async({topic,partition,message})=>{
//             const order = JSON.parse(message.value.toString());
//             await sendMail(order.email, "Order Confirmation", order);
//         }
//     })
// }

// function getMailSubject(topic){
//   switch(topic){
//     case "order-placed":
//       return "Order Confirmation"
//     case "ticket-resolved":
//       return "Ticket Resolved"
//   }
// }

// async function startTicketConsumer(){
//     await consumer.connect();
//     let topic = process.env.KAFKA_TOPIC_TICKET
//     await consumer.subscribe({ topic: topic, fromBeginning: true });

//     console.log("Subscribed to consumer");

//     let subject = getMailSubject(topic)

//     await consumer.run({
//         eachMessage:async({topic,partition,message})=>{
//             const data = JSON.parse(message.value.toString());
//             await sendMail(topic,order.email, subject, order);
//         }
//     })
// }

// module.exports = {
//   startConsumer,
// };


const { Kafka } = require("kafkajs");
const fs = require("fs");
const { sendMail } = require("../../utils/sendMail");

require("dotenv").config();

const kafka = new Kafka({
  clientId: "mail-service",
  brokers: [process.env.KAFKA_BROKER],
  ssl: {
    ca: [fs.readFileSync("./certs/ca.pem", "utf-8")],
  },
  sasl: {
    mechanism: "plain",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});

const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID,
});

function getMailSubject(topic) {
  switch (topic) {
    case "order-placed":
      return "Order Confirmation";

    case "ticket-resolved":
      return "Ticket Resolved";

    case "send-otp":
      return "Verify your email address";

    case "reset-password":
      return "Recover your account password";

    default:
      return "Notification";
  }
}

async function startConsumer() {
  try {
    await consumer.connect();

    await consumer.subscribe({
      topic: process.env.KAFKA_TOPIC_ORDER,
      fromBeginning: true,
    });

    await consumer.subscribe({
      topic: process.env.KAFKA_TOPIC_TICKET,
      fromBeginning: true,
    });

    await consumer.subscribe({
      topic: process.env.KAFKA_TOPIC_OTP,
      fromBeginning: true,
    });
    await consumer.subscribe({
      topic: process.env.KAFKA_TOPIC_RESET_PASS,
      fromBeginning: true,
    });

    console.log("📩 Mail service subscribed to topics");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const data = JSON.parse(message.value.toString());

          console.log(
            `📨 Message received from ${topic}:`,
            data
          );

          const subject = getMailSubject(topic);

          await sendMail(
            topic,
            data.email,
            subject,
            data
          );

          console.log(`✅ Email sent for ${topic}`);
        } catch (error) {
          console.error(
            `❌ Error processing message from ${topic}:`,
            error
          );
        }
      },
    });
  } catch (error) {
    console.error("❌ Consumer startup error:", error);
  }
}

module.exports = {
  startConsumer,
};