import CampaignModel from '#models/Campaign.js'

import {getTimestamp} from '#utils/Helper.js'

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
    ).sort({createdAt: -1})
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
    const statusDetailsByRecipients = {}
    const {campaignName, messageContent, recipients, scheduleTime} = request.body
    const queue = 'queue-processing'
    for (const recipient of recipients) {
      statusDetailsByRecipients[recipient] = {processStartTime: getTimestamp()}
    }

    // Initiate task data to the database as a pending status
    const campaign = new CampaignModel({
      campaignName: campaignName,
      messageContent: messageContent,
      recipients: recipients,
      scheduleTime: scheduleTime,
      createdBy: request.user._id,
      statusDetailsByRecipients,
      status: 'pending'
    })
    const savedData = await campaign.save()
    sendTaskToQueue(queue, savedData.toObject())
    response.status(201).json({message: 'Campaign queued for processing', task_id: savedData._id})
  } catch (error) {
    appErrorLog({type: 'createCampaign', body: request.body, error: error.stack})
    response.status(500).json({error: 'Failed to queue campaign'})
  }
}
