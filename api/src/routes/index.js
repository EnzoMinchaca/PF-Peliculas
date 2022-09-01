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



module.exports = router