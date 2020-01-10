const nodemailer = require('nodemailer');
const mailgun = require('mailgun-js');
const express = require('express');
const db = require('./models');
const routes = require('./routes');


const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/', routes);


const DOMAIN = 'sandboxfa8b87880a8a4cc087143aeb3e0aba45.mailgun.org'; // This is the domain that mailgun has set up
const mg = mailgun({ apiKey: 'cc61edb77eb1569e9eb6b4b8d5e04fee-713d4f73-005e548a', domain: DOMAIN }); // This is  for Mailgun to authorize us and points to our domain.

app.post('/send', (req, res) => {
  const output = `
  <h3>Rewards</h3>
  <p>Congrats! ${req.body.name} has completed ${req.body.chore}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'mail.YOURDOMAIN.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'YOUREMAIL', // Not sure what to do for this. I think Dave had mentioned a service to put here but not sure
      pass: 'YOURPASSWORD',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Nodemailer Contact" <your@email.com>', // sender address
    to: 'RECEIVEREMAILS', // list of receivers
    subject: 'Node Contact Request', // Subject line
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

    res.render('contact', { msg: 'Email has been sent' });
  });
});


// Sync sequelize models then start Express app
// =============================================
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
