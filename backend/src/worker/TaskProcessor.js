import CampaignModel from '#models/Campaign.js'

import {getTimestamp} from '#utils/Helper.js'
import {socketIO} from '#utils/Socket.js'

import {sendCampaignEmails} from '#services/EmailService.js'
import {appErrorLog} from '#services/Log.js'
import {createWorker} from '#worker/WorkerWrapper.js'

/**
 * Mark as completed a campaign task.
 * @param {import('#shared/types/index').Task} task - The task data from the RabbitMQ message.
 * @param {import('#shared/types/index').StatusDetailsByRecipients} statusDetailsByRecipients - The task recipients email.
 */
async function changeCampaignStatus(task, statusDetailsByRecipients) {
  try {
    await CampaignModel.updateOne(
      {_id: task._id},
      {
        $set: {
          successCount: task.successCount,
          failureCount: task.failureCount,
          statusDetailsByRecipients,
          status: 'completed'
        }
      }
    )
    // need socket notification here
    console.log('Campaign processed and saved:', task._id)
  } catch (error) {
    console.log(error)
    appErrorLog({type: 'campaignTaskProcessor', task, error: error.stack})
  }
}

/**
 * Processes a campaign task.
 * @param {import('#shared/types/index').Task} task - The task data from the RabbitMQ message.
 */
async function campaignTaskProcessing(task) {
  try {
    console.log({task})
    task.successCount = 0
    task.failureCount = 0
    // need socket notification here
    const campaign = await CampaignModel.findOneAndUpdate(
      {_id: task._id},
      {
        $set: {
          status: 'processing'
        }
      }
    ).select('statusDetailsByRecipients')
    const {statusDetailsByRecipients = {}} = campaign
    for (const recipient of task.recipients) {
      statusDetailsByRecipients[recipient] = {
        ...statusDetailsByRecipients[recipient],
        processingTime: getTimestamp()
      }

      const {sendingStatus} = await sendCampaignEmails(recipient)
      socketIO
        .in(`user_${task.createdBy}`)
        .emit('email-notification', {email: recipient, sendingStatus})
      if (sendingStatus === 'success') {
        task.successCount++
      } else if (sendingStatus === 'failed') {
        task.failureCount++
      }
      socketIO.in(`user_${task.createdBy}`).emit('campaign-update', {
        _id: task._id,
        campaignName: task.campaignName,
        successCount: task.successCount,
        failureCount: task.failureCount
      })
      statusDetailsByRecipients[recipient] = {
        ...statusDetailsByRecipients[recipient],
        processEndTime: getTimestamp(),
        sendingStatus
      }
    }
    await changeCampaignStatus(task, statusDetailsByRecipients)
  } catch (error) {
    console.log(error)
    appErrorLog({type: 'campaignTaskProcessing', task, error: error.stack})
  }
}

export async function startWorker() {
  const campaignQueues = {
    'queue-processing': campaignTaskProcessing
  }
  for (const queueName in campaignQueues) {
    const processorFunction = campaignQueues[queueName]
    // Pass the task processor and the queue name to the worker
    await createWorker(queueName, processorFunction, 5)
  }

  console.log('Campaign worker started.')
}
