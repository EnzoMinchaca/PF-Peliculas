const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    date: {
        type: Number,
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
    },
    trailer: {
        type: String,
        require: true
    },
    genres: {
        type: Array,
        require: true
    }
    // genres: [{
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Genre'
    // }]
})

module.exports = mongoose.model('Movie', movieSchema)