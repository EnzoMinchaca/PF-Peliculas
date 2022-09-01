const mongoose = require('mongoose')

const platformSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    }
})

module.exports = mongoose.model('Platform', platformSchema)