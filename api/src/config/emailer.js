require('dotenv').config();

const nodemailer = require("nodemailer")
const { google } = require("googleapis")

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
  
module.exports.RetrievePassword = async  ( email,verificationLink ) => {
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

module.exports.SendPuchase = async ( email, MoviesBuy ) => {
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
  let imagenes = "";
  let nameMovies = "";
  let date = "";
  let hour = "";
  let price = "";
  let links = "";
  let total = MoviesBuy.length
  let value = "";
  if(MoviesBuy){
    
    imagenes = MoviesBuy.map(e =>{
      return `<td><img src=${e.image}></td>`
    }).join().split("").filter(e => {
      if(e !== ","){
        return e
      }
    }).join("")
    nameMovies = MoviesBuy.map(e =>{
      return `<td>Title: ${e.title}</td>`
    }).join().split("").filter(e => {
      if(e !== ","){
        return e
      }
    }).join("")
    date = MoviesBuy.map(e =>{
      return `<td>Date: ${e.date}</td>`
    }).join().split("").filter(e => {
      if(e !== ","){
        return e
      }
    }).join("")
    hour = MoviesBuy.map(e =>{
      return `<td>Hour: ${e.duration}</td>`
    }).join().split("").filter(e => {
      if(e !== ","){
        return e
      }
    }).join("")
    price = MoviesBuy.map(e =>{
      return `<td>Price: $${e.price}</td>`
    }).join().split("").filter(e => {
      if(e !== ","){
        return e
      }
    }).join("")

    links = MoviesBuy.map(e => {
      return `<a href=${e.trailer} style="margin-left:10px ;margin-left: 10px; font-size: 20px;">Watch ${e.title}</a>`
    }).join().split("").filter(e => {
      if(e !== ","){
        return e
      }
    }).join("")

    value = MoviesBuy.map(e => {
      return Number(e.price)
    }).reduce((acc, c)=>{
      return acc+ c
    })
  }


  transporter.sendMail({
    from: "Puchase successful",
    to: email,
    subject: "Shipping confirmation of purchase.",
    html:`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
        <style>
            h4{
                font-size: 20px;
                color: white
            }
            p{
                font-size: 20px;
                font: bold;
            }
            i{
                font-size: 20px;
            }
            div > a{
                font-size: 20px;
            }
            a{
                text-decoration: none; 
                font-size:20px;  
            }
            img{
                height: 300px;
            }
            td{
                font-size: 20px;
                font: bold;
            }
            div > a {
          }
        </style>
        
    </head>
    <body>
    <div style="width:100% ; background-color:  #2E86C1 ;">
        <div style="background-color: rgba(0, 0, 0, 0.514);">
            <!-- Imagen inicial -->
            <div style="padding: 20px 10px 20px 10px; height: 100px; text-align:center" >
                <div style="position:absolute ; left:50% ; transform: translate(-50%); top:3%;">
                    <img src="carrete.png" style="width: 100px; height: 80px; display: inline;">
                    <a target="_blank" href="https://localhost:3000/home"><h1 style="display: inline-block; color:black;">Movies Films.</h1></a>
                </div>
            </div>
            <!-- Contenido Principal -->
            <div style=" background-color: #D0D3D4 ; padding: 20px 10px 20px 10px ; text-align: center ; ">
                <div style=" text-align: center ;height: 800px ; width: 100%;">
                    <h2>¡Congratulations these ${total} movies have been added to your gallery!</h2>
                    <table id="table-base" style="text-align: center; margin: auto; background-color:#5D6D7E  ; padding: 20px 10px 20px 10px; border-radius: 2%; ">
                    <tr>
                        ${imagenes}
                    </tr>
                    <tr>
                        ${nameMovies}
                    </tr>
                    <tr>
                        ${date}
                    </tr>
                    <tr>
                        ${hour}
                    </tr>
                    <tr>
                        ${price}
                    </tr>
                    </table>
                    <p>¡Successful purchase!</p>
                    <p>This is the total cost of the movies : $${value}</p>
                    <p>Here is the link of each of the movies:</p>
                    <div>
                        ${links}
                    </div>
                    <hr>
                    <a href="http://localhost:3000/Home">Go to website</a>
                </div>
            </div>
            <div style=" padding: 20px 10px 20px ; color: black; text-align: center" background-color:  #2E86C1>
                <!-- Services -->
                <i>Customer service: pruebaDatos89@gmail.com || © 2022 MoviesFilms. All Rights Reserved.</i>
            </div>
        </div>
    </div>
    </body>
    </html>`,
    attachments:[
      {
        filename:"carrete.png",
        path:"./src/config/imageEmail/carrete.png",
        cid:"logo"
      }
    ],
    
  }).catch(error=> console.log(error))
}

module.exports.BannedAccount = async ( name, lastname, email, role ) => {
  oAuth2Client.setCredentials({ refresh_token: REFRESHTOKEN})

  let comunicate = [ "Your account has been banned.", "Your account has been unbanned."]
  let response;
  
  if(role === "Banned"){

    response = comunicate[0]
    
  }else{

    response = comunicate[1]
  
  }

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
    from: "Banned Account",
      to:email,
      subject: "Account status",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title></title>
          <style>
              h4{
                  font-size: 20px;
                  color: white
              }
              p{
                  font-size: 20px;
                  font: bold;
              }
              i{
                  font-size: 20px;
              }
              div > a{
                  font-size: 20px;
              }
              a{
                  text-decoration: none;   
              }
          </style>
      </head>
      <body>
      <div style="width:100% ; background-color:  #2E86C1 ;">
          <div style="background-color: rgba(0, 0, 0, 0.514);">
              <!-- Imagen inicial -->
              <div style="padding: 20px 10px 20px 10px; height: 100px; text-align:center" >
              <div style="position:absolute ; left:50% ; transform: translate(-50%); top:3%;">
              <img src=cid:logo style="width: 100px; height: 80px; display: inline;">
                      <a target="_blank" href="https://localhost:3000/home"><h1 style="display: inline-block; color:black;">Movies Films.</h1></a>
                  </div>
              </div>
              <!-- Contenido Principal -->
              <div style=" background-color: #D0D3D4 ; padding: 20px 10px 20px 10px ; text-align: center">
                  <p style="color:black ; font-size: 30px;">${response}</p>
                  <p>Name: ${name} ${lastname} | Email: ${email}</p>
                  <p>For more information on the matter, contact:</p>
                  <p>pruebaDatos89@gmail.com</p>
                  <hr>
                  <a href="https://localhost:3000/home">Go to website</a>
              </div>
              <div style=" padding: 20px 10px 20px ; color: black; text-align: center" >
                  <!-- Services -->
                  <i>Customer service: pruebaDatos89@gmail.com || © 2022 MoviesFilms. All Rights Reserved.</i>
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
  }).catch(error => console.log(error))
}

module.exports.PromotionAccount = async ( name, lastname, email , role ) => {
  console.log("Check")

  let comunicate = [ "Your account has been Promoted to:", "Your account has been downgraded to:"]
  let response;
  if( role === "Admin" || role === "Owner") {
    response = comunicate[0]
  }else{
    response = comunicate[1]
  }
  

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
    from: "Promotion Account",
      to:email,
      subject: "Account status",
      html:`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title></title>
          <style>
              h4{
                  font-size: 20px;
                  color: white
              }
              p{
                  font-size: 20px;
                  font: bold;
              }
              i{
                  font-size: 20px;
              }
              div > a{
                  font-size: 20px;
              }
              a{
                  text-decoration: none;   
              }
              
          </style>
      </head>
      <body>
      <div style="width:100% ; background-color:  #2E86C1 ;">
          <div style="background-color: rgba(0, 0, 0, 0.514);">
              <!-- Imagen inicial -->
              <div style="padding: 20px 10px 20px 10px; height: 100px; text-align:center" >
                  <div style="position:absolute ; left:50% ; transform: translate(-50%); top:3%;">
                      <img src=cid:logo style="width: 100px; height: 80px; display: inline;">
                      <a target="_blank" href="https://localhost:3000/home"><h1 style="display: inline-block; color:black;">Movies Films.</h1></a>
                  </div>
              </div>
              <!-- Contenido Principal -->
              <div style=" background-color: #D0D3D4 ; padding: 20px 10px 20px 10px ; text-align: center">
                  <h3>${response}</h3>
                  <h2>${role}</h2>
                  <p>Name: ${name} ${lastname} | Email: ${email}</p>
                  <p>For more information on the matter, contact:</p>
                  <p>pruebaDatos89@gmail.com</p>
                  <hr>
                  <a href="https://localhost:3000/home"Go to website</a>
              </div>
              <div style=" padding: 20px 10px 20px ; color: black; text-align: center" >
                  <!-- Services -->
                  <i>Customer service: pruebaDatos89@gmail.com || © 2022 MoviesFilms. All Rights Reserved.</i>
              </div>
          </div>
      </div>
      </body>
      </html>`,
      attachments:[
        {
          filename:"carrete.png",
            path:"./src/config/imageEmail/carrete.png",
            cid:"logo"
        }
      ]
      
  }).catch(error=> console.log(error))

}


