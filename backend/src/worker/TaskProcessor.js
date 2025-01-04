import Campaign from '#models/Campaign.js'

import {appErrorLog} from '#services/Log.js'
// import {sendCampaignEmails} from '#services/EmailService.js'
import {createWorker} from '#worker/WorkerWrapper.js'

/**
 * Processes a campaign task.
 * @param {object} task - The task data from the RabbitMQ message.
 */
const campaignTaskProcessor = async (task) => {
  try {
    console.log('Processing campaign task:', task.name)
    //   await sendCampaignEmails(task);

    // Save processed data to the database
    const campaign = new Campaign({
      name: task.name,
      message: task.message,
      recipients: task.recipients,
      scheduleTime: task.scheduleTime,
      createdBy: task.createdBy,
      status: 'completed'
    })

    await campaign.save()

    console.log('Campaign processed and saved:', campaign._id)
  } catch (error) {
    console.log(error)
    appErrorLog({type: 'campaignTaskProcessor', task, error: error.stack})
  }
}

export const startWorker = async () => {
  const queue = 'campaign_queue'

  // Pass the task processor and the queue name to the wrapper
  await createWorker(queue, campaignTaskProcessor, 5)

  console.log('Campaign worker started.')
}
