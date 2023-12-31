const { createTransport } = require("nodemailer");

const sendMail = async ({ to, html, subject }) => {
  try {
    const userName = process.env.MAILER_USER_NAME;
    const password = process.env.MAILER_USER_PASSWORD;
    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: userName,
        pass: password,
      },
    });
    const info = await transporter.sendMail({
      from: userName,
      to: to,
      subject: subject,
      html: html,
    });
  } catch (err) {
    console.log("ERror", err);
  }
};

module.exports = { sendMail };
