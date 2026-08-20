function orderConfirmationTemplate({
  name,
  orderId,
  amount,
  expectedDeliveryDate,
  brandName = "Duziolon",
}){
  return `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      color: #333;
    ">

      <div style="
        background: #111827;
        color: white;
        padding: 25px;
        text-align: center;
      ">
        <h1 style="margin: 0;">
          Order Confirmed 🎉
        </h1>
      </div>

      <div style="padding: 30px;">

        <p>
          Dear <strong>${name}</strong>,
        </p>

        <p>
          Thank you for trusting us! We are thrilled to confirm that
          your order has been received and is being processed.
        </p>

        <div style="
          background: #f3f4f6;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        ">
          <p style="margin: 5px 0;">
            <strong>Order Number:</strong> ${orderId}
          </p>

          <p style="margin: 5px 0;">
            <strong>Amount Paid:</strong> ₹${amount}
          </p>

          <p style="margin: 5px 0;">
            <strong>Expected Delivery:</strong>
            ${new Date(expectedDeliveryDate).toLocaleDateString("en-IN")}
          </p>
        </div>

        <div style="
          margin-top: 25px;
          padding: 20px;
          border-left: 4px solid #22c55e;
          background: #f0fdf4;
        ">
          <h3 style="margin-top: 0;">
            What's next?
          </h3>

          <p style="margin-bottom: 0;">
            Your order is now being processed. We will keep you
            updated when your order is shipped.
          </p>
        </div>

        <p style="margin-top: 30px;">
          If you have any questions or concerns, please don't hesitate
          to contact us.
        </p>

        <p>
          Thank you again for your support. Happy shopping! 🛍️
        </p>

        <p>
          Warm Regards,<br />
          <strong>${brandName} Team</strong>
        </p>

      </div>

      <div style="
        background: #f3f4f6;
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #666;
      ">
        Thank you for shopping with ${brandName}.
      </div>

    </div>
  `;
};
function ticketResolvedTemplate({
  name,
  orderId,
  ticketId,
  brandName = "Duziolon",
}) {

  // console.log("this is from send mail here,",name,orderId,ticketId)

  return `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      color: #333;
    ">

      <div style="
        background: #111827;
        color: white;
        padding: 25px;
        text-align: center;
      ">
        <h1 style="margin: 0;">
          Support Ticket Resolved ✅
        </h1>
      </div>

      <div style="padding: 30px;">

        <p>
          Dear <strong>${name}</strong>,
        </p>

        <p>
          We’re happy to let you know that your support request has been
          successfully resolved by our support team.
        </p>

        <p>
          We hope the resolution provided has addressed your concern and
          that everything is now back on track.
        </p>

        <div style="
          background: #f3f4f6;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        ">

          <p style="margin: 5px 0;">
            <strong>Order Number:</strong> ${orderId}
          </p>

          <p style="margin: 5px 0;">
            <strong>Ticket ID:</strong> ${ticketId}
          </p>

          <p style="margin: 5px 0;">
            <strong>Status:</strong>
            <span style="color: #16a34a; font-weight: bold;">
              Resolved
            </span>
          </p>

        </div>

        <div style="
          margin-top: 25px;
          padding: 20px;
          border-left: 4px solid #22c55e;
          background: #f0fdf4;
        ">
          <h3 style="margin-top: 0;">
            Need further assistance?
          </h3>

          <p style="margin-bottom: 0;">
            If you feel that your issue has not been completely resolved,
            please contact our support team and mention your ticket ID.
            We’ll be happy to assist you further.
          </p>
        </div>

        <p style="margin-top: 30px;">
          Thank you for your patience and for giving us the opportunity
          to assist you.
        </p>

        <p>
          We truly appreciate your trust in ${brandName}. ❤️
        </p>

        <p>
          Warm Regards,<br />
          <strong>${brandName} Support Team</strong>
        </p>

      </div>

      <div style="
        background: #f3f4f6;
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #666;
      ">
        Thank you for choosing ${brandName}.
      </div>

    </div>
  `;
}

function otpVerificationTemplate({
  name,
  otp,
  brandName = "Duziolon",
  expiryMinutes = 10,
}) {
  return `
    <div style="
      margin: 0;
      padding: 40px 15px;
      background-color: #f3f4f6;
      font-family: Arial, Helvetica, sans-serif;
      color: #111827;
    ">

      <div style="
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      ">

        <!-- Header -->
        <div style="
          background: #111827;
          padding: 28px 30px;
          text-align: center;
        ">
          <h1 style="
            margin: 0;
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
          ">
            ${brandName}
          </h1>
        </div>

        <!-- Content -->
        <div style="padding: 40px 35px;">

          <h2 style="
            margin: 0 0 15px;
            font-size: 26px;
            color: #111827;
          ">
            Welcome aboard, ${name}! 👋
          </h2>

          <p style="
            margin: 0 0 20px;
            font-size: 16px;
            line-height: 1.7;
            color: #4b5563;
          ">
            We're excited to have you with us. To complete your
            account creation, please verify your email address using
            the confirmation code below.
          </p>

          <!-- OTP Card -->
          <div style="
            margin: 30px 0;
            padding: 28px 20px;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            text-align: center;
          ">

            <p style="
              margin: 0 0 12px;
              font-size: 13px;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 1px;
              font-weight: 600;
            ">
              Your verification code
            </p>

            <div style="
              font-size: 38px;
              font-weight: 700;
              letter-spacing: 10px;
              color: #111827;
              padding-left: 10px;
            ">
              ${otp}
            </div>

            <p style="
              margin: 15px 0 0;
              font-size: 13px;
              color: #6b7280;
            ">
              This code expires in ${expiryMinutes} minutes.
            </p>

          </div>

          <!-- Security Notice -->
          <div style="
            padding: 16px 18px;
            background: #fff7ed;
            border-left: 4px solid #f97316;
            border-radius: 6px;
            margin-bottom: 25px;
          ">
            <p style="
              margin: 0;
              font-size: 14px;
              line-height: 1.6;
              color: #7c2d12;
            ">
              <strong>Security reminder:</strong>
              Never share this verification code with anyone.
              Our team will never ask you for your OTP.
            </p>
          </div>

          <p style="
            margin: 0 0 20px;
            font-size: 14px;
            line-height: 1.6;
            color: #6b7280;
          ">
            If you didn't try to create an account with ${brandName},
            you can safely ignore this email.
          </p>

          <p style="
            margin: 30px 0 0;
            font-size: 15px;
            line-height: 1.6;
            color: #374151;
          ">
            Thanks for choosing ${brandName}! ❤️
          </p>

          <p style="
            margin: 5px 0 0;
            font-size: 15px;
            color: #374151;
          ">
            <strong>${brandName} Team</strong>
          </p>

        </div>

        <!-- Footer -->
        <div style="
          padding: 22px 30px;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          text-align: center;
        ">

          <p style="
            margin: 0;
            font-size: 12px;
            line-height: 1.6;
            color: #9ca3af;
          ">
            This is an automated email. Please do not reply to this message.
          </p>

          <p style="
            margin: 8px 0 0;
            font-size: 12px;
            color: #9ca3af;
          ">
            © ${new Date().getFullYear()} ${brandName}. All rights reserved.
          </p>

        </div>

      </div>

    </div>
  `;
}


function forgotPasswordTemplate({
  name,
  resetUrl,
  brandName = "Duziolon",
  expiryMinutes = 15,
}) {
  return `
    <div style="
      margin: 0;
      padding: 40px 15px;
      background-color: #f3f4f6;
      font-family: Arial, Helvetica, sans-serif;
      color: #111827;
    ">

      <div style="
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      ">

        <!-- Header -->
        <div style="
          background: #111827;
          padding: 28px 30px;
          text-align: center;
        ">
          <h1 style="
            margin: 0;
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
          ">
            ${brandName}
          </h1>
        </div>

        <!-- Content -->
        <div style="padding: 40px 35px;">

          <h2 style="
            margin: 0 0 15px;
            font-size: 26px;
            color: #111827;
          ">
            Reset your password 🔐
          </h2>

          <p style="
            margin: 0 0 20px;
            font-size: 16px;
            line-height: 1.7;
            color: #4b5563;
          ">
            Hi <strong>${name}</strong>,
          </p>

          <p style="
            margin: 0 0 25px;
            font-size: 16px;
            line-height: 1.7;
            color: #4b5563;
          ">
            We received a request to reset the password for your
            ${brandName} account.
          </p>

          <p style="
            margin: 0 0 30px;
            font-size: 16px;
            line-height: 1.7;
            color: #4b5563;
          ">
            Click the button below to create a new password and
            regain access to your account.
          </p>

          <!-- Reset Button -->
          <div style="
            text-align: center;
            margin: 35px 0;
          ">

            <a
              href="${resetUrl}"
              style="
                display: inline-block;
                background: #111827;
                color: #ffffff;
                text-decoration: none;
                padding: 15px 32px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
              "
            >
              Reset Password
            </a>

          </div>

          <!-- Expiry Notice -->
          <div style="
            padding: 16px 18px;
            background: #fff7ed;
            border-left: 4px solid #f97316;
            border-radius: 6px;
            margin: 25px 0;
          ">

            <p style="
              margin: 0;
              font-size: 14px;
              line-height: 1.6;
              color: #7c2d12;
            ">
              <strong>Important:</strong>
              This password reset link will expire in
              ${expiryMinutes} minutes.
            </p>

          </div>

          <!-- Fallback URL -->
          <p style="
            margin: 25px 0 8px;
            font-size: 13px;
            color: #6b7280;
          ">
            If the button above doesn't work, copy and paste the
            following link into your browser:
          </p>

          <p style="
            margin: 0;
            padding: 12px;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            font-size: 12px;
            line-height: 1.5;
            word-break: break-all;
            color: #4b5563;
          ">
            ${resetUrl}
          </p>

          <!-- Security Notice -->
          <div style="
            margin-top: 30px;
            padding: 18px;
            background: #fef2f2;
            border-left: 4px solid #ef4444;
            border-radius: 6px;
          ">

            <p style="
              margin: 0;
              font-size: 14px;
              line-height: 1.6;
              color: #991b1b;
            ">
              <strong>Didn't request this?</strong><br />
              If you didn't request a password reset, you can safely
              ignore this email. Your password will remain unchanged.
            </p>

          </div>

          <p style="
            margin: 30px 0 0;
            font-size: 15px;
            line-height: 1.6;
            color: #374151;
          ">
            Stay secure,<br />
            <strong>${brandName} Team</strong>
          </p>

        </div>

        <!-- Footer -->
        <div style="
          padding: 22px 30px;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          text-align: center;
        ">

          <p style="
            margin: 0;
            font-size: 12px;
            line-height: 1.6;
            color: #9ca3af;
          ">
            This is an automated email. Please do not reply to this message.
          </p>

          <p style="
            margin: 8px 0 0;
            font-size: 12px;
            color: #9ca3af;
          ">
            © ${new Date().getFullYear()} ${brandName}. All rights reserved.
          </p>

        </div>

      </div>

    </div>
  `;
}


module.exports = {orderConfirmationTemplate,ticketResolvedTemplate,otpVerificationTemplate,forgotPasswordTemplate};