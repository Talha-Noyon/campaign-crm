import {Activity, CheckCircle, MinusCircle, PlusCircle, XCircle} from 'lucide-react'
import {useState} from 'react'

import CampaignForm from '@/pages/dashboard/CampaignForm'

import {getCampaign} from '@/api'
import {useSocketNotification} from '@/hooks/useSocketNotification'
import {useStore} from '@/store'

const Dashboard: React.FC = () => {
  useSocketNotification(getCampaign)
  const [showCreateCampaign, setShowCreateCampaign] = useState(false)
  const campaignMetrics = useStore((state) => state.campaignMetrics)

  const toggleCampaignForm = () => {
    setShowCreateCampaign((prev) => !prev)
  }

  return (
    <div className="tw-min-h-screen tw-bg-gray-100 tw-p-6">
      <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
        <h1 className="tw-text-3xl tw-font-extrabold tw-text-gray-800">
          📊 Campaign Monitoring Dashboard
        </h1>
        <button
          onClick={toggleCampaignForm}
          className="tw-btn tw-flex tw-items-center tw-rounded-lg tw-bg-blue-500 tw-px-4 tw-py-2 tw-text-white tw-shadow-md tw-transition hover:tw-bg-blue-600"
        >
          {showCreateCampaign ? (
            <MinusCircle className="tw-mr-2" />
          ) : (
            <PlusCircle className="tw-mr-2" />
          )}
          Create Campaign
        </button>
      </div>
      {showCreateCampaign && (
        <CampaignForm toggleCampaignForm={toggleCampaignForm} getCampaign={getCampaign} />
      )}
      <div className="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-3">
        {campaignMetrics.map((metric, index) => {
          const total = metric.successCount + metric.failureCount
          return (
            <div
              key={index}
              className="tw-hover:shadow-xl tw-hover:-translate-y-1 tw-transform tw-rounded-xl tw-border tw-border-gray-200 tw-bg-white tw-p-6 tw-shadow-lg tw-transition tw-duration-300"
            >
              <h2 className="tw-mb-4 tw-flex tw-items-center tw-space-x-2 tw-text-xl tw-font-semibold tw-text-gray-700">
                <Activity className="tw-text-blue-500" />
                <span>{metric.campaignName}</span>
              </h2>
              <div className="tw-space-y-2 tw-text-sm tw-text-gray-600">
                <p className="tw-flex tw-items-center tw-space-x-2">
                  <CheckCircle className="tw-text-green-500" />
                  <span>
                    Success: <strong className="tw-text-gray-800">{metric.successCount}</strong>
                  </span>
                </p>
                <p className="tw-flex tw-items-center tw-space-x-2">
                  <XCircle className="tw-text-red-500" />
                  <span>
                    Failures: <strong className="tw-text-gray-800">{metric.failureCount}</strong>
                  </span>
                </p>
                <p>
                  Total: <strong className="tw-text-gray-800">{total}</strong>
                </p>
              </div>
              <div className="tw-mt-4">
                <div className="tw-relative tw-h-2 tw-rounded-full tw-bg-gray-300">
                  <div
                    className="tw-absolute tw-left-0 tw-top-0 tw-h-full tw-rounded-full tw-bg-green-500"
                    style={{
                      width: `${(metric.successCount / total) * 100 || 0}%`
                    }}
                  ></div>
                  <div
                    className="tw-absolute tw-top-0 tw-h-full tw-rounded-full tw-bg-red-500"
                    style={{
                      left: `${(metric.successCount / total) * 100 || 0}%`,
                      width: `${(metric.failureCount / total) * 100 || 0}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
