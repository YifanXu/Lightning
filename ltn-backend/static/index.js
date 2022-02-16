const host = "localhost:3000"

const socket = new WebSocket(`ws://${host}/ws`)

$("document").ready(() => {
  // Connection opened
  socket.addEventListener('open', function (event) {
    console.log('connection opened')
  });

  const formatToDouble = (num) => {
    return num < 10 ? "0" + num : num.toString()
  }

  // Listen for messages
  socket.addEventListener('message', async function (event) {
    console.log(event);
    const msg = await event.data.text()
    console.log(msg)
    const msgObj = JSON.parse(msg)
    const date = new Date(msgObj.time)
    $(".display").html($(".display").html() + `${msgObj.name}[${date.getHours()}:${formatToDouble(date.getMinutes())}:${formatToDouble(date.getSeconds())}]: ${msgObj.message}\n`);
  });

  const send = () => {
    const name = $(".name").val()
    const msg = $(".input").val()
    if (name && msg && socket) {
      const outgoingObj = JSON.stringify({
        name,
        time: Date.now(),
        message: msg
      })
      console.log(outgoingObj)
      socket.send(outgoingObj)
      $(".input").val("")
    }
  }

  $(".input").keypress(e => {
    if (e.which === 13) {
      send()
    }
  })
})

