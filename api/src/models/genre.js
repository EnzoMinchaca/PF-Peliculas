const mongoose = require('mongoose')

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    }
})

module.exports = mongoose.model('Genre', genreSchema)