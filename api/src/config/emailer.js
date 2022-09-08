const nodemailer = require("nodemailer")

const email = process.env.EMAIL
const pass = process.env.PASSWORD
const cliendId = process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET
const refreshToken = process.env.REFRESHTOKEN
const accessToken = process.env.ACCESSTOKEN




let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "ivanlabra46@gmail.com",
      clientId: "349684398334-ua759bu6cr6b3qtopvv0tomhr9d9j99g.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken: "1//04FzTc-ewtFu8CgYIARAAGAQSNwF-L9Ir43xw7KBDQPxgpSk5jxd7yKWejrRbJsMTOdhKORx4Fuy97gDNFYeWc4nJV-sqd-ggjak",
      accessToken: "ya29.a0AVA9y1vjfdM1IujvHb8bbw0_JoPhgkDOuEUQMkd0bPk7z0V_g3wGU2-hUnUrwYlS_AWqWRkLnn96K8XhK3edlflQpdxB9_Li5Z3_rXCYk3syasgbABatnSlEsrUQ174hwJyZ7fl2Ve1OVHbxdcO81Z-TZ5syaCgYKATASAQASFQE65dr8m755v4J4vMBmlJ16zsTINg0163",
      expires: 1484314,
    }
  }); 

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log("Check");
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


  module.exports.RetrievePassword = ( email ) => {
    console.log("Check")
  
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
  /* module.exports.sendConfirmationEmail = async (name, email, confirmationCode) =>{
    const OAuth2 = new tokenGoogle(
      accesToken.auth.clientId,
      accesToken.auth.clientSecret,
      "https://developers.google.com/oauthplayground"
    )  
    await OAuth2.setCredentials({
      refreshToken: accesToken.auth.refreshToken,
      tls:{
        rejectUnauthorized: false
      }
    })

    console.log("llega hasta aca")
    OAuth2.getAccessToken((err, token) => {

      console.log("entro adentro")
      if(err) return console.log(err)

      accesToken.auth.refreshToken = token;

      let envio = nodemailer.createTransport(accesToken)

      envio.sendMail({
        from: name,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:3001/confirmUser/${confirmationCode}> Click here</a>
            </div>`,
      }).catch(err => console.log(err));


    })
} */