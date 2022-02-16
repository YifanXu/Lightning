const express = require('express')
const ws = require('ws')

const app = express()

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true, path:'/ws' })

wsServer.on('connection', socket => {
  socket.on('message', message => {
    console.log(message.toString('utf-8'))
    wsServer.clients.forEach(client => client.send(message))
  })
})

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server

app.use('/', express.static('static'))

const server = app.listen(3000)
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request)
  })
})