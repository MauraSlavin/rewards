/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const nodemailer = require('nodemailer');


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 25,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '94d75e804a60a7',
    pass: '043da35e4ab89f',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// setup email data with unicode symbols

const mailOptions = (email, subject, html) => {
  const mailSettings = {
    from: '<Dave@rewards.io>',
    to: email,
    subject: subject,
    text: 'Hello world?',
    html: html,
  };
  return mailSettings;
};


module.exports = {
  transporter,
  mailOptions,
};
