const { Router } = require('express')
const { getMovies } = require('../controllers/controller_getNameMovie.js')
const movieSchema = require('../models/movie.js')
const genreSchema = require('../models/genre.js')
const platformSchema = require('../models/platform.js')
const userSchema = require("../models/user")
const jwt = require("jsonwebtoken")
const nodemailer = require("../config/emailer")
const bcrypt = require("bcrypt")

const {PaymentController, createPayment, executePayment} = require('../controllers/paymentsController')
const PaymentService = require('../service/paymentService')
const PaymentInstance = new PaymentController(new PaymentService())

const router = Router()

router.post('/postMovies', async(req, res) => {
    try {
        const movie = movieSchema(req.body)
        const createMovie = await movie.save()
        res.json(createMovie)
    }
    catch(error) {
        console.log(error)
    }
});

router.post('/genres', async(req, res) => {
    try {
        const genre = genreSchema(req.body)
        const createGenre = await genre.save()
        res.json(createGenre)
    }
    catch(error) {
        console.log(error)
    }
});

router.get('/genres', async(req, res) => {
    try {
        const genre = await genreSchema.find()
        res.json(genre)
    }
    catch(error) {
        console.log(error)
    }
});

router.post('/platform', async(req, res) => {
    try {
        const platform = platformSchema(req.body)
        const createPlatform = await platform.save()
        res.json(createPlatform)
    }
    catch(error) {
        console.log(error)
    }
});

router.get('/getMovies', async(req,res)=>{
    let allMovies = await movieSchema.find();
    const {nameMovie}= req.query;
    console.log(nameMovie)
    try {
        let response = await getMovies(nameMovie,allMovies);
        res.send(response);

      } catch (error) {
        console.log(error);
    }
});

router.get('/movieDetails/:idMovie', async(req,res)=>{
    const {idMovie}= req.params;
    try {
      let response = await movieSchema.findById(idMovie);
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  });

router.get('/platform', async(req, res) => {
    try {
        const platform = await platformSchema.find()
        res.json(platform)
    }
    catch(error) {
        console.log(error)
    }
});


router.put("/movies/:id", async ( req, res )=> {
    const { title, date, description, rating, platform, image, duration, cast, director, trailer, genres, price  } = req.body;
    const { id } = req.params;

    let _id = id

    try {
        
        let movieModify = await movieSchema.findById(_id);

        if(!movieModify || movieModify === null)return console.log("No movie was found in the database with that id.");
        
        title? movieModify.title = title : console.log("Title not changed.");
        date? movieModify.date = date : console.log("Date was not modified.");
        description? movieModify.description = description : console.log("Description was not modified.");
        rating? movieModify.rating = rating : console.log("Rating was not modified.");
        platform? movieModify.platform = platform : console.log("Platform was not modified.");
        image? movieModify.image = image : console.log("Image was not modified.")
        duration? movieModify.duration = duration : console.log("Duration was not modified.");

        if(  cast !== undefined && cast.length > 0){
            movieModify.cast = cast
        }else{
            console.log("Cast was not modified.")
        }
        director? movieModify.director = director : console.log("Director was not modified.");
        trailer? movieModify.trailer = trailer : console.log("No trailer modified.");
        if( genres !== undefined && genres.length > 0){
            movieModify.genres = genres
        }else{
            console.log("Genres were not modified.")
        }
        price? movieModify.price = price : console.log("Price was not modified.")

        await movieModify.save()

        res.status(200).json(movieModify)
        
    } catch (error) {
        console.error(error)
    }

})

router.delete("/movies/:id", async ( req, res ) => {

    const { id } = req.params;

    try {
        if(!id)return res.send("No ID was sent.")

        await movieSchema.findByIdAndDelete(id, function (err, movie) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted : ", movie);
                res.status(200).send("Your movie was deleted successfully.")
            }
        });
    } catch (error) {
        console.error(error)
    }

});

router.post("/registerUser", async ( req, res ) => {
    const { name, lastname, password, email } = req.body;
    
    try {

        const emailBD = await userSchema.findOne({email})
        if(emailBD) return res.status(409).json({message: "Email in use."}) 

        const token = jwt.sign({ email: req.body.email }, process.env.SECRET);

        const user = await userSchema.create(
            {
                name,
                lastname,
                password:  await userSchema.encryptPassword(password),
                email,
                confirmationCode: token,
                token: "0"
            }
        )

        nodemailer.sendConfirmationEmail(
                user.name,
                user.email,
                user.confirmationCode
            )
            return res.send({
                message:
                "User was registered successfully! Please check your email",
            });
    } catch (error) {
        console.error(error)
    }
})

router.get("/confirmUser/:token", async ( req, res ) => {
    const { token } = req.params

    try {

        const user = await userSchema.findOne({ confirmationCode : token });

        if( !user ) return res.send("User Not found.")

        user.status = "Active"

        user.save()

        console.log("User active.")


        return res.redirect("http://localhost:3000/home")
    
    } catch (error) {

        console.log(error)
    }
})

router.post('/loginUser', async(req, res) => {  //ruta para el ingreso
    try {
        const {email,password} = req.body
        
        if(!email || !password){
            res.status(404).send('You must complete all fields') // si no ingreso algun campo
        }
        
        else{
            const user = await userSchema.findOne({ email: email });
            if(user){
                console.log(await bcrypt.compare( password, user.password))
                if( ! await bcrypt.compare( password, user.password)){ //contraseña o usuarion invalido, compare devuelve un booleano
               res.status(404).send('The email or password entered is not correct') //la contraseña o usuario no son correctos 
             }
             else{
               const id = user._id;

               const token= jwt.sign({id:id},process.env.SECRET)

               res.json(user) 
            }
            }else{
                res.status(404).send("No user fount")
            }
          
        }
    }
    catch(error) {
        console.log(error)
    }
});


router.post('/payment', async(req, res) => {     //para mercadopago en req se le pasan por body los datos del usuario
    PaymentInstance.getPaymentLink(req, res)
});

router.post('/paymentPay', createPayment)       //paypal

router.post('/executePay', executePayment)


router.put('/editUser/:idUser', async(req, res) => {  //ruta para cambiar datos del usuario
    try {
        const {idUser}= req.params;
        const {nameUser,lastname} = req.body;  //me llega en {name: "Raul",lastName: "Alvares"}
        const user = await userSchema.findById(idUser);
        if(!idUser){res.status(404).send('Error')}
        if(Object.keys(user).length===0){
            res.status(404).send('User does not exist') 
        }else{ 
           if(nameUser && lastname){
             await userSchema.findByIdAndUpdate(idUser, { $set: { name: nameUser }})
             await userSchema.findByIdAndUpdate(idUser, { $set: { lastname: lastname }})
             res.send('Your first and lastname were successfully changed')
           }else if(nameUser){
             await userSchema.findByIdAndUpdate(idUser, { $set: { name: nameUser }})
             res.send('Your name was changed successfully')
           }else if(lastname){
             await userSchema.findByIdAndUpdate(idUser, { $set: { lastname: lastname }})
             res.send('Your lastname was successfully changed')
           } 
           res.send('You must complete the field you want to modify');
        }
    }
    catch(error) {
        console.log(error)
    }
  });

  router.put('/putUserPassword', async(req, res) => {  //ruta para la contraseña del usuario

    try {
        const { email } = req.body;
        const user = await userSchema.findOne({ email: email });
        console.log("entra")
        console.log(email)
        if(!user) return res.send("El usuario no existe.")

        /* const salt = await bcrypt.genSalt(10);
        const newPassBcrypt =await bcrypt.hash(newPassword, salt);      
        await userSchema.findOneAndUpdate({ token: token }, { $set: { password: newPassBcrypt }})*/ 
        const token = jwt.sign({ email }, process.env.SECRET);
        console.log(token)
        console.log(email)
        user.token = token

        user.save()

        let verificationLink = `http://localhost:3000/password/${token}`
        nodemailer.RetrievePassword(
            email,
            verificationLink
        )

        res.send('A link to change your password was sent to your email.');    
    }
    catch(error) {
        console.log(error)
    }
});

router.post("/confirmPassword/:token", async ( req, res ) => {

    const { token } = req.params;
    const { password } = req.body;

    try {

    const user = await userSchema.findOne({ token });

    if(!user) return res.send("The user was not found.")//res.redirect("https://localhost:3000/register")

    console.log("usuario encontrado")
    user.password = await userSchema.encryptPassword(password)
    user.save()

    return res.send(`Exited change`)

} catch (error) {
    console.log(error)
    res.status(404).send("The user's password could not be changed.")
}
})


  router.put('/addBuy/:idUser', async(req, res) => {

    try {
        const {idUser} = req.params
     const {buyMovie} = req.body 

      if(!buyMovie) {

        res.send('could not add user buy, missing data')

    }

    const user = await userSchema.findById(idUser);

    let newBuy = user.buy.concat(buyMovie)

     const response = await userSchema.findByIdAndUpdate(idUser, { $set: { buy: newBuy }}) 

     res.json(response)

    }

    catch(error) {

        console.log(error)

    }

  });

router.get('/userId/:id', async(req, res) => {
    try {
        const {id} = req.params
        const user = await userSchema.findById(id);
        res.json(user)
    }
    catch(error) {
        console.log(error)
    }
})

  
router.put('/promoveUsers/:id', async(req, res) => {  //ruta para cambiar el estado del usuario
    try {
        const {id}= req.params;    //{id: id, role : 'admin' o 'user' ...}
        const {role}= req.body;
        let changeStatus;
        const user= await userSchema.findById(id);
        if(!user){
          res.status(404).send('The user does not exist')
        }

         if(role==='Admin'){
          changeStatus = await userSchema.findByIdAndUpdate(id, { $set: { isUser: false, isAdmin: true, isOwner:false, isBan:false}})
         }else if(role==='User'){
          changeStatus = await userSchema.findByIdAndUpdate(id, { $set: { isUser: true, isAdmin: false, isOwner:false, isBan:false}})
         }else if(role==='Banned'){
          changeStatus = await userSchema.findByIdAndUpdate(id, { $set: { isUser:false, isAdmin: false, isOwner:false, isBan:true}})
         }else if(role==='Owner'){
          changeStatus = await userSchema.findByIdAndUpdate(id, { $set: { isUser: false, isAdmin: false, isOwner:true, isBan:false}})  
         }

        if(changeStatus){
            res.send(`${user.name} is status changed successfully`)
        }
    
    }
    catch(error) {
        console.log(error)
    }
});
router.delete('/deletUsers/:id', async(req, res) => {  //ruta para la eliminar usuario
    try {
        const {id} = req.params;
        let userDelete = await userSchema.findByIdAndDelete(id)
        if(!id){res.status(404).send('Error')}
        if(userDelete){
          res.send('Your username was successfully deleted')
        }
        else{
          res.send('An error occurred when deleting the user')
        }
    }
    catch(error) {
        console.log(error)
    }
});
  
router.get('/getUsers', async(req, res) => {  //ruta para traer todos los usuarios devuelve array de obj

    try {
     const allUsers = await userSchema.find();
     res.send(allUsers)
    }
    catch(error) {
        console.log(error)
    }
});


  //busca usuario por nombre
  router.get('/getUsersName', async(req,res)=>{
    let allUsers = await userSchema.find();
    const {nameUser}= req.query;
    try {
        if(allUsers.length ===0) res.sen('There is no registered user yet')
        if(nameUser){
            let user = allUsers.filter(e => e.name.toLowerCase().includes(nameUser.toLowerCase())
             )
            if(user.length){
              res.send(user);
            } 
            else {res.send('User not found')};
        }else{
            res.send('Invalid name');
          }
      } catch (error) {
        console.log(error);
    }
});

router.post("/sendPuchase", async ( req, res ) => {

    //Tiene que llegar todo en string;
    //Date ejemplo : 13/9/2022
    //Hour ejemplo : 12:50
    
    const { email, nameMovie, date, hour, linkViewMovie, price , image} = req.body;

    nodemailer.SendPuchase(
        email,
        nameMovie,
        date,
        hour,
        linkViewMovie,
        price,
        image
    )

    res.send("Revisa el email o tu lista de peliculas adqueridas.")
})
router.put('/addBuyInMovie', async(req, res) => {  

    try {
        const {buyMovies}= req.body;//viene un array de obj
         let setBuyMovies= [];
         for (let i = 0; i < buyMovies.length; i++) {
            const movie= await movieSchema.findById(buyMovies[i]._id);
            
             let newAmount = movie.amountOfSales + 1;
             let addAmountInMovie = await movieSchema.findByIdAndUpdate(buyMovies[i]._id, { $set: { amountOfSales: newAmount}})
             if(addAmountInMovie){
              setBuyMovies.push(addAmountInMovie)
             }else{
              res.send('Error adding sales amount')
             }
         }
         if(setBuyMovies.length >0){
           res.status(200).send('Quantity added successfully')
         }
    }
    catch(error) {
         console.log(error)
    }
});

module.exports = router 