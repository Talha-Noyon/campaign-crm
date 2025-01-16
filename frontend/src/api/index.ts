import {type CampaignDataParams, type CampaignModel} from '@shared/types/index'

import {fetcher} from '@/api/fetcher'

// import {sleep} from '@/utils/Common'

export async function getCampaign() {
  return await fetcher<CampaignModel>('/api/campaigns', {
    method: 'GET'
  })
}

export async function createCampaign(campaignDataParams: CampaignDataParams) {
  return await fetcher<CampaignModel>('/api/campaigns', {
    method: 'POST',
    json: campaignDataParams
  })
}
