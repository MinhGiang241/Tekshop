import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mail = (process.env as any).EMAIL_ADMIN;
const password = (process.env as any).PASSWORD_EMAIL_ADMIN;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: mail,
    pass: password,
  },
});

export const sendWelcomeEmail = (email: string, name: string) => {
  let mailOptions = {
    from: mail,
    to: email,
    subject: "Testing and Testing",
    text: `wellcome to my app ${name}`,
  };

  transporter.sendMail(mailOptions, (err: any, data: any) => {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent!!!");
    }
  });
};

export const sendResetPasswordEmail = (
  email: string,
  token: string,
  name: string
) => {
  let mailOptions = {
    from: mail,
    to: email,
    subject: "Thank you",
    text: `Thank you, ${name} for using my app`,
    html: `<p>You requested a password</p>
    <p>Click this <a href="http://localhost:3000/reset/${token}">Link here</a> to set a new Password</p>`,
  };

  transporter.sendMail(mailOptions, (err: any, data: any) => {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent!!!");
    }
  });
};
