import User from "@/models/user.model";
import nodemailer from "nodemailer";
import { v5 as uuidv5 } from "uuid";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = uuidv5(userId.toString(), uuidv5.URL);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verificationToken: hashedToken,
          verificationTokenExpires: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpires: Date.now() + 3600000,
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: 2525 || process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: emailType === "VERIFY" ? "Email Verification" : "Password Reset",
      html:
        emailType === "VERIFY"
          ? `<a href="${process.env.DOMAIN}/verify/?token=${hashedToken}">Click here to verify your email</a>
          <br>
          <p>Or copy and paste the following link in your browser: ${hashedToken}</p>`
          : `<a href="${process.env.DOMAIN}/forgot/?token=${hashedToken}">Click here to reset your password</a>
          <br>
          <p>Or copy and paste the following link in your browser: ${hashedToken}</p>`,
    };

    const info = await transport.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
