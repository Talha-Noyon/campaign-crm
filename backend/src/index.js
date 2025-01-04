import dotenv from 'dotenv'

import connectDB from '#utils/DB.js'
import {connectRabbitMQ} from '#utils/RabbitMQ.js'
import {connectSocket} from '#utils/Socket.js'

import {startWorker} from '#worker/TaskProcessor.js'

dotenv.config()

await connectDB()
await connectRabbitMQ()
await startWorker()
connectSocket()

process.on('unhandledRejection', (error, promise) => {
  console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise)
  console.log(' The error was: ', error)
})

process.on('uncaughtException', function (err) {
  console.error(err.stack)
  console.log('Node NOT Exiting...')
})
