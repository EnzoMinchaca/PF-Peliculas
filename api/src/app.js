const express = require('express')
const server = express()
const morgan = require('morgan')
const routes = require('./routes/index')

server.use(morgan('dev'))
server.use(express.json())
server.use('/', routes)


module.exports = server