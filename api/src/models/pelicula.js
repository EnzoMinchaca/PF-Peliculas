const mongoose = require('mongoose')

const peliculaSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    platform: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    duration: {
        type: String,
        require: true
    },
    cast: {
        type: Array,
        require: true
    },
    director: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Pelicula', peliculaSchema)