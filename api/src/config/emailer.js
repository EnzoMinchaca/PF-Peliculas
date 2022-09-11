const nodemailer = require("nodemailer")
const { google } = require("googleapis")

const email = process.env.EMAIL
const pass = process.env.PASSWORD
const cliendId = process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET
const refreshToken = process.env.REFRESHTOKEN
const accessToken = process.env.ACCESSTOKEN
module.exports.sendConfirmationEmail = async (name, email, confirmationCode) => {

    console.log("Check");
    const CLIENT_ID = "435765551994-0dvbqrs6g6k3qbjr7lfnr3ds2vanuc39.apps.googleusercontent.com"
    const CLIENT_SECRET = "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"
    const REDIRCET_URI = "https://developers.google.com/oauthplayground"
    const REFRESHTOKEN = "1//04-VhYcRds3oICgYIARAAGAQSNwF-L9IrZyomrnIZ2j7BSpYREcpjewY-hx9PMFQMdEV-Mq6qEv3dehuZ6dXtHDGisVa2cv8f_EQ"
    const oAuth2Client = new google.auth.OAuth2( CLIENT_ID, CLIENT_SECRET, REDIRCET_URI)

    oAuth2Client.setCredentials({ refresh_token: REFRESHTOKEN})

    const accessToken = await oAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth:{
        type:"OAuth2",
        user:"pruebadatos86@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESHTOKEN,
        accessToken: accessToken
      },
      tls: {
        rejectUnauthorized: false
      }
    })
    transporter.sendMail({
      from: name,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3001/confirmUser/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };
module.exports.RetrievePassword =async  ( email,verificationLink ) => {
  console.log("Check");
  const CLIENT_ID = "435765551994-0dvbqrs6g6k3qbjr7lfnr3ds2vanuc39.apps.googleusercontent.com"
  const CLIENT_SECRET = "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"
  const REDIRCET_URI = "https://developers.google.com/oauthplayground"
  const REFRESHTOKEN = "1//04-VhYcRds3oICgYIARAAGAQSNwF-L9IrZyomrnIZ2j7BSpYREcpjewY-hx9PMFQMdEV-Mq6qEv3dehuZ6dXtHDGisVa2cv8f_EQ"
  const oAuth2Client = new google.auth.OAuth2( CLIENT_ID, CLIENT_SECRET, REDIRCET_URI)

  oAuth2Client.setCredentials({ refresh_token: REFRESHTOKEN})

  const accessToken = await oAuth2Client.getAccessToken()

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
      type:"OAuth2",
      user:"pruebadatos86@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESHTOKEN,
      accessToken: accessToken
    },
    tls: {
      rejectUnauthorized: false
    }
  })

    transporter.sendMail({
      from: "Password Reset",
      to:email,
      subject: "Please confirm that you are the account owner.",
      html: `<h1>Email Confirmation</h1>
            <h2>You requested for password reset.</h2>
            <p>Click on the link below to be redirected to a place where you can change your password.</p>
            <a href=${verificationLink}>${verificationLink}</a>
            </div>`,
    })
  }