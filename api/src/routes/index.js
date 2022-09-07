const { Router } = require('express')
const { getMovies } = require('../controllers/controller_getNameMovie.js')
const movieSchema = require('../models/movie.js')
const genreSchema = require('../models/genre.js')
const platformSchema = require('../models/platform.js')
const userSchema = require("../models/user")
const jwt = require("jsonwebtoken")
const nodemailer = require("../config/emailer")
const bcrypt = require("bcrypt")


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
                token: token
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

        const user = await userSchema.findOne({ token: token });

        if( !user ) return res.send("User Not found.")

        user.status = "Active"

        user.save()

        res.status(200).send("User active.")

        return res.redirect("https://localhost:3000/Home")
    } catch (error) {
        console.log(error)
    }
})

router.get('/loginUser', async(req, res) => {  //ruta para el ingreso
    try {
        const {email,password} = req.body
        if(!email || !password){
            res.send('You must complete all fields') // si no ingreso algun campo
        }else{
            const user = await userSchema.findOne({ email: email });
             if(user.length===0 || ! bcrypt.compare (password,user.password)){ //contraseña o usuarion invalido, compare devuelve un booleano
               res.send('The email or password entered is not correct') //la contraseña o usuario no son correctos 
             }
             else{
               const id = user._id;
               const token= jwt.sign({id:id},process.env.SECRET)
               res.send(user) 
            }
        }
    }
    catch(error) {
        console.log(error)
    }
});

module.exports = router