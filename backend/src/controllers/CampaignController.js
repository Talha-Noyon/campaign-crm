import CampaignModel from '#models/Campaign.js'

import {getChannel} from '#utils/RabbitMQ.js'

import {sendTaskToQueue} from '#worker/WorkerWrapper.js'

export async function getCampaigns(request, response) {
  try {
    const campaigns = await CampaignModel.find({createdBy: request.user.id})
    response.status(200).json(campaigns)
  } catch (error) {
    appErrorLog({type: 'getCampaigns', body: request.body, error: error.stack})
    response.status(500).json({error: error.message})
  }
}

/**
 * Create a new campaign task and queue it for processing.
 *
 * @param {import('express').Request} request - Express request object.
 * @param {import('express').Response} response - Express response object.
 */
export async function createCampaign(request, response) {
  try {
    const {name, message, recipients, scheduleTime} = request.body
    // Publish task to RabbitMQ
    const channel = getChannel()
    const queue = 'pending-queue-when-initiate'
    const task = {name, message, recipients, scheduleTime, createdBy: request.user.id}

    sendTaskToQueue(queue, task)

    response.status(201).json({message: 'Campaign queued for processing'})
  } catch (error) {
    appErrorLog({type: 'createCampaign', body: request.body, error: error.stack})
    response.status(500).json({error: 'Failed to queue campaign'})
  }
}
