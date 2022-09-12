const sendgrid = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config();
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail(email) {
  try {
    await sendgrid.send({
      from: "holineinadia@gmail.com",
      to: email || "holineinadia@gmail.com",
      subject: "Email confirmation",
      text: "Please confirm your email by link below",
      html: "<strong>For successful registry please confirm your email by link below</strong>",
      templateId: "d-2df93ea111e54ce393aae73452eb0b3a",
    });

    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
}

sendMail();
