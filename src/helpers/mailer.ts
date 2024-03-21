import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verificationToken: hashedToken,
        verificationTokenExpires: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        resetToken: hashedToken,
        resetTokenExpires: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d43ca879c3332c",
        pass: "e16c5963469c4c",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: emailType === "VERIFY" ? "Email Verification" : "Password Reset",
      html:
        emailType === "VERIFY"
          ? `<a href="${process.env.DOMAIN}/verify/?token=${hashedToken}">Click here to verify your email</a>`
          : `<a href="${process.env.DOMAIN}/reset/${hashedToken}">Click here to reset your password</a>`,
    };

    const info = await transport.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
