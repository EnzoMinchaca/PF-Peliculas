const mongoose = require('mongoose')

const commentsSchema = mongoose.Schema({
    allComments: {
        type: Array,
        require: true
    },
    titleMovie: {
        type: String,
        require: true,
        unique: true
    },
    idApiMovie: {
        type: Number,
        require: true
    },
})

module.exports = mongoose.model('ExternalComments', commentsSchema)