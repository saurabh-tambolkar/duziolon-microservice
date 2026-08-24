const nodemailer = require("nodemailer");
const {orderConfirmationTemplate,ticketResolvedTemplate, otpVerificationTemplate, forgotPasswordTemplate} = require("../mailtemplates/mail");

require('dotenv').config();
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  family: 4,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

let getHtmlAsPerTopic=(topic,order)=>{
  switch(topic){
    case "order-placed":
      return orderConfirmationTemplate(order)
    case "ticket-resolved":
      return ticketResolvedTemplate(order)
    case "send-otp":
      return otpVerificationTemplate(order)
    case "reset-password":
      return forgotPasswordTemplate(order)
  }
}

async function sendMail(topic,to, subject, order) {
  try {
    // console.log(`Preparing to send email to ${to} with subject "${subject}" and order:`, order);
    let html = getHtmlAsPerTopic(topic,order);
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
module.exports = {
  sendMail,
};
