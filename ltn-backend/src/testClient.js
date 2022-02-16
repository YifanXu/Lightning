const ws = require('ws');

const client = new ws('ws://localhost:3000/ws');

client.on('open', () => {
  // Causes the server to print "Hello"
  client.send(JSON.stringify({text: 'Hello'}))
})

client.on('message', (msg) => {
  console.log(JSON.parse(msg.toString('utf-8')))
})