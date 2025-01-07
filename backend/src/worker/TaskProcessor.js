import CampaignModel from '#models/Campaign.js'

import {getTimestamp} from '#utils/Helper.js'

import {sendCampaignEmails} from '#services/EmailService.js'
import {appErrorLog} from '#services/Log.js'
import {createWorker, sendTaskToQueue} from '#worker/WorkerWrapper.js'

/**
 * @typedef {Object} Task
 * @property {string} name - The name of the task.
 * @property {string} message - The message content of the task.
 * @property {string[]} recipients - An array of recipient email addresses.
 * @property {string} scheduleTime - The scheduled time for the task in timestamp format.
 * @property {string} createdBy - The ID or name of the user who created the task.
 * @property {StatusDetailsByRecipients} statusDetailsByRecipients - A map of recipients and their status details.
 * @property {string} status - The status of the task (e.g., 'pending', 'processing', 'completed').
 */

/**
 * @typedef {Object} StatusDetails
 * @property {number} processStartTime - The start time of the process.
 * @property {number} processingTime - The total processing time.
 * @property {number} processEndTime - The end time of the process.
 */

/**
 * @typedef {Object.<string, StatusDetails>} StatusDetailsByRecipients
 */

/**
 * Mark as completed a campaign task.
 * @param {Task} task - The task data from the RabbitMQ message.
 * @param {StatusDetailsByRecipients} statusDetailsByRecipients - The task recipients email.
 */
async function saveCamapaignTask(task, statusDetailsByRecipients) {
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
 * @param {Task} task - The task data from the RabbitMQ message.
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
    task._id = savedData._id
    sendTaskToQueue(processingQueueName, task)
    // need socket notification here
  } catch (error) {
    console.log(error)
    appErrorLog({type: 'campaignTaskInitiate', task, error: error.stack})
  }
}

/**
 * Processes a campaign task.
 * @param {Task} task - The task data from the RabbitMQ message.
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
      statusDetailsByRecipients[recipient] = {processEndTime: getTimestamp(), sendingStatus}
    }
    await saveCamapaignTask(task, statusDetailsByRecipients)
  } catch (error) {
    console.log(error)
    appErrorLog({type: 'campaignTaskProcessing', task, error: error.stack})
  }
}

export async function startWorker() {
  // const campaignQueues = ['pending-queue-when-initiate', 'processing-queue']
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
