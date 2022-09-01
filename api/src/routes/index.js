const { Router } = require('express')
const movieSchema = require('../models/movie.js')
const genreSchema = require('../models/genre.js')
const platformSchema = require('../models/platform.js')
const router = Router()

router.post('/movies', async(req, res) => {
    try {
        const movie = movieSchema(req.body)
        const createMovie = await movie.save()
        res.json(createMovie)
    }
    catch(error) {
        console.log(error)
    }
})

router.get('/movies', async(req, res) => {
    try {
        const movie = await movieSchema.find()
        res.json(movie)
    }
    catch(error) {
        console.log(error)
    }
})

router.post('/genres', async(req, res) => {
    try {
        const genre = genreSchema(req.body)
        const createGenre = await genre.save()
        res.json(createGenre)
    }
    catch(error) {
        console.log(error)
    }
})

router.get('/genres', async(req, res) => {
    try {
        const genre = await genreSchema.find()
        res.json(genre)
    }
    catch(error) {
        console.log(error)
    }
})

router.post('/platform', async(req, res) => {
    try {
        const platform = platformSchema(req.body)
        const createPlatform = await platform.save()
        res.json(createPlatform)
    }
    catch(error) {
        console.log(error)
    }
})

router.get('/platform', async(req, res) => {
    try {
        const platform = await platformSchema.find()
        res.json(platform)
    }
    catch(error) {
        console.log(error)
    }
})

router.put("/movies/:id", async ( req, res )=> {
    const { title, date, description, rating, platform, image, duration, cast, director, trailer, genres, price  } = req.body;
    const { id } = req.params;

    let _id = id

    try {
        
        let movieModify = await movieSchema.findById(_id);

        if(!movieModify || movieModify === null)return console.log("No se encontro ninguna pelicula en la base de datos con ese id.");
        
        title? movieModify.title = title : console.log("No se modifico tittle.");
        date? movieModify.date = date : console.log("No se modifico date.");
        description? movieModify.description = description : console.log("No se modifico description.");
        rating? movieModify.rating = rating : console.log("No se modifico rating.");
        platform? movieModify.platform = platform : console.log("No se modifico platform");
        image? movieModify.image = image : console.log("No se modifico image.")
        duration? movieModify.duration = duration : console.log("No se modifico duration.");

        if(  cast !== undefined && cast.length > 0){
            movieModify.cast = cast
        }else{
            console.log("No se modifico cast.")
        }
        director? movieModify.director = director : console.log("No se modifico director.");
        trailer? movieModify.trailer = trailer : console.log("No se modifico trailer.");
        if( genres !== undefined && genres.length > 0){
            movieModify.genres = genres
        }else{
            console.log("No se modifico genres")
        }
        price? movieModify.price = price : console.log("No se modifico price.")

        await movieModify.save()

        res.status(200).json(movieModify)
        
    } catch (error) {
        console.error(error)
    }
})
module.exports = router