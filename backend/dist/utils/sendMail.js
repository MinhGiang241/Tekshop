"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordEmail = exports.sendWelcomeEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mail = process.env.EMAIL_ADMIN;
const password = process.env.PASSWORD_EMAIL_ADMIN;
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: mail,
        pass: password,
    },
});
const sendWelcomeEmail = (email, name) => {
    let mailOptions = {
        from: mail,
        to: email,
        subject: "Testing and Testing",
        text: `wellcome to my app ${name}`,
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log("Error Occurs", err);
        }
        else {
            console.log("Email sent!!!");
        }
    });
};
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendResetPasswordEmail = (email, token, name) => {
    let mailOptions = {
        from: mail,
        to: email,
        subject: "Thank you",
        text: `Thank you, ${name} for using my app`,
        html: `<p>You requested a password</p>
    <p>Click this <a href="http://localhost:3000/reset/${token}">Link here</a> to set a new Password</p>`,
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log("Error Occurs", err);
        }
        else {
            console.log("Email sent!!!");
        }
    });
};
exports.sendResetPasswordEmail = sendResetPasswordEmail;
