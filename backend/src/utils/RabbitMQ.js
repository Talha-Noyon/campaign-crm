import amqplib from 'amqplib'

import {env} from '#utils/Env.js'

let connection
let channel

/**
 * Initialize RabbitMQ connection and channel from https://www.cloudamqp.com/.
 * @returns {Promise<void>}
 */
export const connectRabbitMQ = async () => {
  try {
    connection = await amqplib.connect(env.RABBITMQ_URI)
    channel = await connection.createChannel()
    console.log('RabbitMQ connected')
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error)
    process.exit(1)
  }
}

/**
 * Get the RabbitMQ channel.
 * @returns {amqplib.Channel} RabbitMQ channel.
 */
export const getChannel = () => {
  if (!channel) {
    throw new Error('RabbitMQ channel is not initialized')
  }
  return channel
}

/**
 * Close RabbitMQ connection.
 * @returns {Promise<void>}
 */
export const closeRabbitMQ = async () => {
  try {
    await channel.close()
    await connection.close()
    console.log('RabbitMQ connection closed')
  } catch (error) {
    console.error('Error closing RabbitMQ connection:', error)
  }
}
