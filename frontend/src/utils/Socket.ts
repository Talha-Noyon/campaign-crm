import socketClient, {type Socket} from 'socket.io-client'

import {API_URL} from '@/utils/Common'

export const socket: Socket = socketClient(API_URL, {
  transports: ['websocket'],
  upgrade: false
})
