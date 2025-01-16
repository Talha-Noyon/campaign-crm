import CampaignModel from '#models/Campaign.js'

import {appErrorLog} from '#services/Log.js'
import {sendTaskToQueue} from '#worker/WorkerWrapper.js'

/**
 * Create a new campaign task and queue it for processing.
 *
 * @param {import('express').Request} request - Express request object.
 * @param {import('express').Response} response - Express response object.
 */
export async function getCampaigns(request, response) {
  try {
    const campaigns = await CampaignModel.find(
      {createdBy: request.user.id},
      {_id: 1, campaignName: 1, messageContent: 1, successCount: 1, failureCount: 1}
    ).sort({_id: -1})
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
    const {campaignName, messageContent, recipients, scheduleTime} = request.body
    console.log(request.user)
    console.log(request.body)
    const queue = 'pending-queue-when-initiate'
    const task = {
      campaignName,
      messageContent,
      recipients,
      scheduleTime,
      createdBy: request.user._id
    }

    sendTaskToQueue(queue, task)

    response.status(201).json({message: 'Campaign queued for processing'})
  } catch (error) {
    appErrorLog({type: 'createCampaign', body: request.body, error: error.stack})
    response.status(500).json({error: 'Failed to queue campaign'})
  }
}
