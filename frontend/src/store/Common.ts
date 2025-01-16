import {type BellNotification, type CampaignMetrics} from '@shared/types'
import {useEffect} from 'react'

import {type Slice, useStore} from '@/store'

export type State = {
  socketStatus: boolean
  campaignMetrics: CampaignMetrics[]
  bellNotifications: BellNotification[]
  isOnline: boolean
}

export const defaultState: State = {
  campaignMetrics: [],
  bellNotifications: [{email: 'example@gmail.com', sendingStatus: 'success'}],
  socketStatus: false,
  isOnline: true
}

type Action = {
  setCommon: (status: Partial<State>) => void
  addBellNotification: (newNotification: BellNotification) => void
  addCampaignMetrics: (campaignMetrics: CampaignMetrics[]) => void
  updateCampaignMetrics: (campaignMetrics: CampaignMetrics) => void
  resetCampaignMetrics: (campaignMetrics: CampaignMetrics[]) => void
  resetAllState: () => void
}

export type CommonSlice = State & Action

export const createCommonSlice: Slice<CommonSlice> = (set, get) => ({
  ...defaultState,
  setCommon(common) {
    set(common)
  },
  addBellNotification(newNotification: BellNotification) {
    const currentNotifications = get().bellNotifications
    set({
      bellNotifications: [...currentNotifications, newNotification].slice(-15)
    })
  },
  addCampaignMetrics(currentMetrics: CampaignMetrics[]) {
    const prevMetrics = get().campaignMetrics
    set({
      campaignMetrics: [...prevMetrics, ...currentMetrics]
    })
  },
  resetCampaignMetrics(currentMetrics: CampaignMetrics[]) {
    set({
      campaignMetrics: currentMetrics
    })
  },
  updateCampaignMetrics(campaignMetrics: CampaignMetrics) {
    const currentMetrics = get().campaignMetrics
    for (const currentMetric of currentMetrics) {
      if (currentMetric._id === campaignMetrics._id) {
        currentMetric.failureCount = campaignMetrics.failureCount
        currentMetric.successCount = campaignMetrics.successCount
      }
    }
    set({
      campaignMetrics: [...currentMetrics]
    })
  },
  resetAllState() {
    set({
      ...defaultState
    })
  }
})

export function useInitIsOnline() {
  const setCommon = useStore((state) => state.setCommon)

  useEffect(() => {
    function handleStatus() {
      setCommon({isOnline: navigator.onLine})
    }

    handleStatus()

    window.addEventListener('offline', handleStatus)
    window.addEventListener('online', handleStatus)

    return () => {
      window.removeEventListener('offline', handleStatus)
      window.removeEventListener('online', handleStatus)
    }
  }, [setCommon])
}
