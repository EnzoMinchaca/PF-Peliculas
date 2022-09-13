const nodemailer = require("nodemailer")
const { google } = require("googleapis")

/* const email = process.env.EMAIL
const pass = process.env.PASSWORD
const cliendId = process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET
const refreshToken = process.env.REFRESHTOKEN
const accessToken = process.env.ACCESSTOKEN */

    const CLIENT_ID = "435765551994-0dvbqrs6g6k3qbjr7lfnr3ds2vanuc39.apps.googleusercontent.com"
    const CLIENT_SECRET = "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"
    const REDIRCET_URI = "https://developers.google.com/oauthplayground"
    const REFRESHTOKEN = "1//04-VhYcRds3oICgYIARAAGAQSNwF-L9IrZyomrnIZ2j7BSpYREcpjewY-hx9PMFQMdEV-Mq6qEv3dehuZ6dXtHDGisVa2cv8f_EQ"
    const oAuth2Client = new google.auth.OAuth2( CLIENT_ID, CLIENT_SECRET, REDIRCET_URI)


module.exports.sendConfirmationEmail = async (name, email, confirmationCode) => {

    console.log("Check");
    
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

module.exports.SendPuchase = async ( email, nameMovie, date, hour, linkViewMovie, price, image ) => {
  console.log("Check")

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
  //transporter.verify().then(data=> console.log(data)).catch(error=> console.log(error))
  transporter.sendMail({
    from: "Puchase successful",
    to: email,
    subject: "Shipping confirmation of purchase.",
    html:`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <style>
    td > h2 {
      color: white;
    }
    h4{
      font-size: 20px;
      color: white
    }
    p{
      font-size: 20px;
    }
    i{
      font-size: 20px;
    }
    div > a{
      margin-left: 10px;
      margin-right: 10px;
      font-size: 20px;
    }
    a{
      text-decoration: none;   
    }
    table{
      margin-top: 100px;
    }
    img{
      max-height:300px; max-width: 220px ;
    }
    </style>
</head>
<body>
<div style="width:100% ; background-color:  #2E86C1 ;">
    <div style="background-color: rgba(0, 0, 0, 0.514);">
        <!-- Imagen inicial -->
        <div style="padding: 20px 10px 20px 10px; height: 100px; text-align:center" >
            <div style="position:absolute ; left:50% ; transform: translate(-50%); top:3%">
                <img src=cid:logo style="width: 100px; height: 80px; display: inline;">
                <a target="_blank" href="https://localhost:3000/home"><h1 style="display: inline-block; color:black;">Movies Films.</h1></a>
            </div>
        </div>
        <!-- Contenido Principal -->
        <div style=" background-color: #D0D3D4 ; padding: 20px 10px 20px 10px ; text-align: center;">
            <h1>¡Purchase made successfully!</h1>
            <div style=" text-align: center ;height: 350px ; width: 100%; background-color: #5D6D7E; padding-top: 2%;">
                <table style="text-align: center; margin: auto; ">
                    <tr>
                        <td rowspan="5"><img src=${image} style="border-radius: 5px;"></td>
                    </tr>
                    <tr>
                        <td ><h2>Title:</h2></td>
                        <td ><h2>${nameMovie}</h2></td>
                    </tr>
                    <tr>
                        <td><h4>Purchase date:</h4></td>
                        <td><h4>${date}</h4></td>
                    </tr>
                    <tr>
                        <td><h4>Time of purchase:</h4></td>
                        <td><h4>${hour}</h4></td>
                    </tr>
                    <tr>
                        <td><h4>Price:</h4></td>
                        <td><h4>$${price}</h4></td>
                    </tr>
                </table>
            </div>
            <p>To watch the movie, go to the following link:</p>
            <a href=${linkViewMovie}>Watch ${nameMovie}</a>
            <!-- Agradecimiento -->
            <p>Thanks for your purchase.</p>
            
        </div>


        <div style=" padding: 20px 10px 20px ; color: black; text-align: center" >
            <!-- Services -->
            <p> Customer service: pruebaDatos89@gmail.com || © 2022 MoviesFilms. All Rights Reserved.</p>
        </div>
    </div>
</div>
</body>
</html>
    `,
    attachments:[
      {
        filename:"carrete.png",
        path:"./src/config/imageEmail/carrete.png",
        cid:"logo"
      }
    ]
  }).catch(error=> console.log(error))
}


