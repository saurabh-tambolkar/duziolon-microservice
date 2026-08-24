const nodemailer = require("nodemailer");
const {orderConfirmationTemplate,ticketResolvedTemplate, otpVerificationTemplate, forgotPasswordTemplate} = require("../mailtemplates/mail");

require('dotenv').config();
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family:4,
   connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  logger: true,
  debug: true,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP ERROR:", error);
  } else {
    console.log("✅ SMTP READY");
  }
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
      console.log("📤 Sending email to:", to);

    const result = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", result.messageId);

    return result;
  } catch (error) {
    console.error("❌ SMTP ERROR:", {
      code: error.code,
      command: error.command,
      message: error.message,
    });

    throw error;
  }
}
module.exports = {
  sendMail,
};
