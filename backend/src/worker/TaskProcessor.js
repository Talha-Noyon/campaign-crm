import CampaignModel from '#models/Campaign.js'

import {getTimestamp} from '#utils/Helper.js'

import {sendCampaignEmails} from '#services/EmailService.js'
import {appErrorLog} from '#services/Log.js'
import {createWorker, sendTaskToQueue} from '#worker/WorkerWrapper.js'

/**
 * Mark as completed a campaign task.
 * @param {import('#types').Task} task - The task data from the RabbitMQ message.
 * @param {import('#types').StatusDetailsByRecipients} statusDetailsByRecipients - The task recipients email.
 */
async function changeCampaignStatus(task, statusDetailsByRecipients) {
  try {
    await CampaignModel.updateOne(
      {_id: task._id},
      {
        $set: {
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
 * Initiate a campaign task.
 * @param {import('#types').Task} task - The task data from the RabbitMQ message.
 */
async function campaignTaskInitiate(task) {
  const processingQueueName = 'processing-queue'
  const statusDetailsByRecipients = {}
  try {
    for (const recipient of task.recipients) {
      // need socket notification here
      statusDetailsByRecipients[recipient] = {processStartTime: getTimestamp()}
    }

    // Initiate task data to the database as a pending status
    const campaign = new CampaignModel({
      name: task.name,
      message: task.message,
      recipients: task.recipients,
      scheduleTime: task.scheduleTime,
      createdBy: task.createdBy,
      statusDetailsByRecipients,
      status: 'pending'
    })
    const savedData = await campaign.save()
    task._id = savedData._id.toString()
    sendTaskToQueue(processingQueueName, task)
    // need socket notification here
  } catch (error) {
    console.log(error)
    appErrorLog({type: 'campaignTaskInitiate', task, error: error.stack})
  }
}

/**
 * Processes a campaign task.
 * @param {import('#types').Task} task - The task data from the RabbitMQ message.
 */
async function campaignTaskProcessing(task) {
  try {
    // need socket notification here
    const {statusDetailsByRecipients} = await CampaignModel.findOneAndUpdate(
      {_id: task._id},
      {
        $set: {
          status: 'processing'
        }
      }
    ).select('statusDetailsByRecipients')

    for (const recipient of task.recipients) {
      statusDetailsByRecipients[recipient] = {
        ...statusDetailsByRecipients[recipient],
        processingTime: getTimestamp()
      }
      // need socket notification here
      const {sendingStatus} = await sendCampaignEmails(recipient)
      statusDetailsByRecipients[recipient] = {
        ...statusDetailsByRecipients[recipient],
        processEndTime: getTimestamp(),
        sendingStatus
      }
    }
    // Convert Map to Record
    const recordStatusDetails = Object.fromEntries(statusDetailsByRecipients)
    await changeCampaignStatus(task, recordStatusDetails)
  } catch (error) {
    console.log(error)
    appErrorLog({type: 'campaignTaskProcessing', task, error: error.stack})
  }
}

export async function startWorker() {
  const campaignQueues = {
    'pending-queue-when-initiate': campaignTaskInitiate,
    'processing-queue': campaignTaskProcessing
  }
  for (const queueName in campaignQueues) {
    const processorFunction = campaignQueues[queueName]
    // Pass the task processor and the queue name to the worker
    await createWorker(queueName, processorFunction, 5)
  }

  console.log('Campaign worker started.')
}
