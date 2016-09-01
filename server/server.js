'use strict'
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const express = require('./config/express')

express.init(app, io)


io.on('connection', function (socket) {
  socket.emit('loginRequest', { hello: 'world' })
  // socket.on('my other event', function (data) {
  //   console.log(data)
  // })
  socket.on('login', console.log)
})

app.listen(3000)
server.listen(3001)
