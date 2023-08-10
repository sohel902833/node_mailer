const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();
const { sendMail } = require("./mailer");

app.use(cors());
dotenv.config({ path: path.join(process.cwd(), ".env") });

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-mail", async (req, res) => {
  try {
    const { subject, body, email, name } = req.body;
    console.log("here");
    const mailText = `
        Name: <b>${name}</b> <br/>
        Email: <b>${email}</b><br/>
        <br/>
        <br/>
       <b><u>Message:</u> </b>
        <br/>
        <br/>
        ${body}

    `;
    sendMail({
      to: "sohrab@zaagsys.com",
      html: mailText,
      subject: subject,
    });
    sendMail({
      to: "mdsohelranask6869@gmail.com",
      html: mailText,
      subject: subject,
    });
    res.status(200).json({
      message: "Email Send",
      success: true,
    });
  } catch (err) {
    res.status(200).json({
      message: "Email Send Failed",
      success: false,
    });
  }
});

app.get("/", async (req, res) => {
  res.json({
    message: "Server is running",
  });
});
app.get("/health", async (req, res) => {
  res.json({
    message: "Server is running",
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
