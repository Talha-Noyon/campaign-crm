import {type CampaignDataParams, type CampaignModel} from '@shared/types/index'

import {fetcher} from '@/api/fetcher'
import {getLocalAuth} from '@/store/LocalAuth'

// import {sleep} from '@/utils/Common'

export async function createCampaign(campaignDataParams: CampaignDataParams) {
  return await fetcher<CampaignModel>('/api/campaigns', {
    method: 'POST',
    json: campaignDataParams
  })
}

async function signOut() {
  const authUser = getLocalAuth()

  return await fetcher<{assignmentExists: boolean; msg: string}>('/update-logout-session', {
    method: 'POST',
    json: {
      user_id: authUser._id,
      user_login_session_id: authUser.token
    }
  })
}
