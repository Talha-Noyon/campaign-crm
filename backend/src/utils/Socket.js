import jwt from 'jsonwebtoken'
import {Server} from 'socket.io'

import app from '#utils/App.js'

import {env} from '#shared/schemas/EnvSchema.js'

const PORT = env.PORT
const JWT_SECRET = env.JWT_SECRET

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
  console.log('onConnection', socket.id)
  socket.on('connect', () => {
    console.log('socket on', socket.id)
  })
  socket.on('set-user-room', (req) => {
    const decoded = jwt.verify(req.token, JWT_SECRET)
    console.log(`user_${decoded.id}`)
    socket.join(`user_${decoded.id}`)
  })
}
setInterval(() => {
  console.log('emit', 'campaign-update')
  /* socketIO
    .in(`user_6783ec28d1abda6c136d8454`)
    .emit('campaign-update', {campaignName: 'Subscription Renewal Reminder'}) */
}, 3000)
export function connectSocket() {
  socketIO.on('connection', onConnection)
}
