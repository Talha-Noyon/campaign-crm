import Campaign from '#models/Campaign.js'

import {getChannel} from '#utils/RabbitMQ.js'

export const getCampaigns = async (request, response) => {
  try {
    const campaigns = await Campaign.find({createdBy: request.user.id})
    response.status(200).json(campaigns)
  } catch (error) {
    response.status(500).json({error: error.message})
  }
}

/**
 * Create a new campaign task and queue it for processing.
 *
 * @param {import('express').Request} request - Express request object.
 * @param {import('express').Response} response - Express response object.
 */
export const createCampaign = async (request, response) => {
  try {
    const {name, message, recipients, scheduleTime} = request.body
    // Publish task to RabbitMQ
    const channel = getChannel()
    const queue = 'campaign_queue'
    const task = {name, message, recipients, scheduleTime, createdBy: request.user.id}

    await channel.assertQueue(queue, {durable: true})
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)), {
      persistent: true,
      headers: {retryCount: 0}
    })

    response.status(201).json({message: 'Campaign queued for processing'})
  } catch (error) {
    console.error('Error queuing campaign:', error)
    response.status(500).json({error: 'Failed to queue campaign'})
  }
}
