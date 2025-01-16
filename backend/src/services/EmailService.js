import {sleep} from '#utils/Helper.js'

export async function sendCampaignEmails(email) {
  await sleep(1000)
  const statuses = ['success', 'failed']
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
  console.log({email, randomStatus})
  return {sendingStatus: randomStatus}
}
