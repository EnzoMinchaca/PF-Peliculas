const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cookieParser())
server.use(cors())
server.use(morgan('dev'))
server.use(express.json())
server.use('/', routes)


module.exports = server