import {createServer} from 'http'
import {Server} from 'socket.io'

import app from '#utils/App.js'

function socket(server) {
  return new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    },
    transports: ['websocket']
  })
}

const server = createServer(app)
export const socketIO = socket(server)

function onConnection(socket) {
  socket.on('connect', () => {
    console.log('socket on', socket.id)
  })
}

export function connectSocket() {
  socketIO.on('connection', onConnection)
}
