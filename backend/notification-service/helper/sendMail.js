const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmailPlaceOder = (to) => {
  const smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "cba.wireme@gmail.com",
      pass: "tdahitvmbpexfkpd",
    },
  });

  const mailOptions = {
    from: "cba.wireme@gmail.com",
    to: to,
    subject: "Order Confirmation",
    body: `
    Your Oder and payment Successfully Completed
  `,
  };

  smtpTransport.sendMail({
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
    text: mailOptions.body,
  });
};

const sendDeliveryStatus = (to) => {
  const smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "cba.wireme@gmail.com",
      pass: "tdahitvmbpexfkpd",
    },
  });

  const mailOptions = {
    from: "cba.wireme@gmail.com",
    to: to,
    subject: "Delivery Status",
    body: `
    Your Order is now Deliverd
  `,
  };

  smtpTransport.sendMail({
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
    text: mailOptions.body,
  });
};

module.exports = { sendEmailPlaceOder, sendDeliveryStatus };
