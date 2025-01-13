import {getChannel} from '#utils/RabbitMQ.js'

export function sendTaskToQueue(queueName, task) {
  const channel = getChannel()
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(task)), {
    persistent: true,
    headers: {retryCount: task.retryCount}
  })
}
/**
 * Generic worker wrapper for RabbitMQ tasks.
 * @param {string} queue - The name of the queue to consume from.
 * @param {function} taskProcessor - The task-specific logic to process each message.
 * @param {number} maxRetries - The maximum number of retry attempts for a task.
 */

export const createWorker = async (queue, taskProcessor, maxRetries = 5) => {
  const channel = getChannel()

  // Assert the queue exists
  await channel.assertQueue(queue, {durable: true})

  console.log(`Worker listening on queue: ${queue}`)

  channel.consume(queue, async (msg) => {
    if (msg) {
      const task = JSON.parse(msg.content.toString())
      const retryCount = msg.properties.headers.retryCount || 0

      try {
        console.log(`Processing task from queue "${queue}":`, task)

        // Call the task-specific processing logic
        await taskProcessor(task)

        // Acknowledge the message after successful processing
        channel.ack(msg)
      } catch (error) {
        console.error(`Error processing task from queue "${queue}":`, error)

        if (retryCount < maxRetries) {
          // Increment retry count and re-queue the task
          task.retryCount = retryCount + 1
          sendTaskToQueue(queue, task)
          // Acknowledge the original message
          channel.ack(msg)
        } else {
          console.error(`Max retries reached for task from queue "${queue}". Discarding message.`)
          channel.nack(msg, false, false) // Discard the message
        }
      }
    }
  })
}
