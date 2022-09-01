const { Router } = require('express')
const { getMovies } = require('../controllers/controller_getNameMovie.js')
const movieSchema = require('../models/movie.js')
// const genreSchema = require('../models/genre.js')
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

// router.post('/genres', async(req, res) => {
//     try {
//         const genre = genreSchema(req.body)
//         const createGenre = await genre.save()
//         res.json(createGenre)
//     }
//     catch(error) {
//         console.log(error)
//     }
// })

// router.get('/genres', async(req, res) => {
//     try {
//         const genre = await genreSchema.find()
//         res.json(genre)
//     }
//     catch(error) {
//         console.log(error)
//     }
// })

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
  })


module.exports = router