import {Server} from 'socket.io'

import app from '#utils/App.js'

import {env} from '#shared/schemas/EnvSchema.js'

const PORT = env.PORT

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

function socket() {
  return new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    },
    transports: ['websocket']
  })
}

export const socketIO = socket()

/**
 * @param {import('socket.io').Socket} socket - socket instance.
 */

function onConnection(socket) {
  socket.on('connect', () => {
    console.log('socket on', socket.id)
  })
}

export function connectSocket() {
  socketIO.on('connection', onConnection)
}
