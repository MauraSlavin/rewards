const nodemailer = require('nodemailer');

const output = `
    <p>You have a new contact request</p>
  `;

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
const mailOptions = {
  from: '"Nodemailer Contact" <Dave@rewards.io>', // sender address
  to: 'dahamilton10@yahoo.com', // list of receivers
  subject: 'Our email test', // Subject line
  text: 'Hello world?', // plain text body
  html: output, // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  return console.log('Email sent!');
});
