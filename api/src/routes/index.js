const { Router } = require('express')
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



module.exports = router