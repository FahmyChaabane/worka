import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const mailOptions = (subject, receiver, data, ccs = "") => ({
  from: process.env.FROM_EMAIL,
  to: receiver,
  cc: ccs,
  subject: subject,
  html: data,
});

export default (options) =>
  new Promise((resolve, reject) => {
    transporter.sendMail(options, function (error, info) {
      if (error) reject(error);
      else resolve(info);
    });
  });
