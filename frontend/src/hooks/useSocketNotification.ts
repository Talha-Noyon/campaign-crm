import {type CampaignMetrics} from '@shared/types'
import {useEffect} from 'react'

import {useStore} from '@/store'

import {removeSocketListeners} from '@/utils/Common'
import {socket} from '@/utils/Socket'

type ActionFunction = (() => Promise<CampaignMetrics[]>) | undefined
export function useSocketNotification(actionFunction?: ActionFunction) {
  const addCampaignMetrics = useStore((state) => state.addCampaignMetrics)
  const updateCampaignMetrics = useStore((state) => state.updateCampaignMetrics)
  useEffect(() => {
    socket.on('campaign-update', (campaignMetric: CampaignMetrics) => {
      updateCampaignMetrics(campaignMetric)
    })
    if (actionFunction) {
      socket.on('campaign-initiate', () => {
        actionFunction()
      })
      actionFunction().then((data: CampaignMetrics[]) => {
        addCampaignMetrics(data)
      })
    }

    return () => {
      removeSocketListeners(socket, ['campaign-update', 'campaign-initiate'])
    }
  }, [actionFunction, addCampaignMetrics, updateCampaignMetrics])

  const addBellNotification = useStore((state) => state.addBellNotification)
  useEffect(() => {
    socket.on('email-notification', (notification) => {
      addBellNotification(notification)
    })
    return () => {
      removeSocketListeners(socket, ['email-notification'])
    }
  }, [addBellNotification])
}
