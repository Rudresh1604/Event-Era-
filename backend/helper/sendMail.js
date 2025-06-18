const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET_KEY;
const redirectUrl = process.env.REDIRECT_URL;
const refreshToken = process.env.REFRESH_TOKEN;

// outh configuration
const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUrl
);
oAuth2Client.setCredentials({ refresh_token: refreshToken });

async function sendMail(mailOption) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    // console.log(accessToken);
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "rdharkar16@gmail.com",
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });
    // console.log(mailOption);

    // const mailOption = {
    //   from: "rdharkar16@gmail.com",
    //   to: "rdharkar16@gmail.com",
    //   subject: "hello from gmail using api",
    //   text: "Hello",
    // };

    const result = transport.sendMail(mailOption);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = sendMail;
