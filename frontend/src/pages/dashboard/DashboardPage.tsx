import {type ReportTypes} from '@shared/types/types'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {Activity, CheckCircle, PieChart, PlusCircle, Upload, XCircle} from 'lucide-react'
import {useEffect, useState} from 'react'
import Select from 'react-select'
import * as Yup from 'yup'

import {DatePicker, type DateTimeRange} from '@/components/DatePicker'

import {fetchReports} from '@/api'
import {useAuth} from '@/store/Auth'

import {getTodayRangeValue, isUnder, toQueryFormat} from '@/utils/Common'
import {socket} from '@/utils/Socket'

interface CampaignMetrics {
  campaignName: string
  total: number
  success: number
  failures: number
  openRate: number // percentage
}

const campaignSchema = Yup.object().shape({
  campaignName: Yup.string()
    .required('Campaign Name is required')
    .max(50, "Campaign Name can't exceed 50 characters"),
  messageContent: Yup.string()
    .required('Message Content is required')
    .max(500, "Message Content can't exceed 500 characters"),
  recipientList: Yup.mixed().required('Recipient list is required'),
  scheduleTime: Yup.date().required('Schedule time is required'),
  category: Yup.object().shape({
    value: Yup.string().required('Category is required'),
    label: Yup.string().required()
  })
})

const categoryOptions = [
  {value: 'promotion', label: 'Promotion'},
  {value: 'announcement', label: 'Announcement'},
  {value: 'reminder', label: 'Reminder'}
]
const Dashboard: React.FC = () => {
  const {auth} = useAuth()
  const {start, end} = getTodayRangeValue()
  const [showCreateCampaign, setShowCreateCampaign] = useState(false)
  const [reports, setReports] = useState<{type: ReportTypes; report: Report}[]>([])
  const [loading, setLoading] = useState(false)
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date())
  const [rangeValue, setRangeValue] = useState<DateTimeRange | null>({
    start,
    end
  })
  const [selectedRangeValue, setSelectedRangeValue] = useState(rangeValue)

  const [metrics, setMetrics] = useState<CampaignMetrics[]>([
    {
      campaignName: 'Getting Request',
      total: 12,
      success: 6,
      failures: 4,
      openRate: 6
    },
    {
      campaignName: 'Getting Request',
      total: 12,
      success: 6,
      failures: 4,
      openRate: 6
    },
    {
      campaignName: 'Getting Request',
      total: 12,
      success: 6,
      failures: 4,
      openRate: 6
    },
    {
      campaignName: 'Getting Request',
      total: 12,
      success: 6,
      failures: 4,
      openRate: 6
    },
    {
      campaignName: 'Getting Request',
      total: 12,
      success: 6,
      failures: 4,
      openRate: 6
    },
    {
      campaignName: 'Getting Request',
      total: 12,
      success: 6,
      failures: 4,
      openRate: 6
    }
  ])

  useEffect(() => {
    async function fetchAndSetReports() {
      if (auth && selectedRangeValue) {
        setLoading(true)
        const reports = await fetchReports({
          startDate: toQueryFormat(selectedRangeValue.start.toString()),
          endDate: toQueryFormat(selectedRangeValue.end.toString())
        })
        setLastUpdateTime(new Date())

        setLoading(false)
        setReports(reports)
      }
    }

    fetchAndSetReports()
  }, [auth, selectedRangeValue])

  const handleCreateCampaign = () => {
    setShowCreateCampaign(true)
  }

  const closeCreateCampaign = () => {
    setShowCreateCampaign(false)
  }

  const onSubmit = (data: any) => {
    console.log('Campaign Data:', data)
    closeCreateCampaign()
  }

  useEffect(() => {
    // Listen for real-time campaign updates
    socket.on('campaign-update', (updatedMetrics: CampaignMetrics) => {
      setMetrics((prevMetrics) => {
        const index = prevMetrics.findIndex(
          (metric) => metric.campaignName === updatedMetrics.campaignName
        )
        if (index !== -1) {
          const newMetrics = [...prevMetrics]
          newMetrics[index] = updatedMetrics
          return newMetrics
        } else {
          return [...prevMetrics, updatedMetrics]
        }
      })
    })
  }, [])

  return (
    <div className="tw-min-h-screen tw-bg-gray-100 tw-p-6">
      <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
        <h1 className="tw-text-3xl tw-font-extrabold tw-text-gray-800">
          📊 Campaign Monitoring Dashboard
        </h1>
        <button
          onClick={handleCreateCampaign}
          className="tw-flex tw-items-center tw-rounded-lg tw-bg-blue-500 tw-px-4 tw-py-2 tw-text-white tw-shadow-md tw-transition hover:tw-bg-blue-600"
        >
          <PlusCircle className="tw-mr-2" /> Create Campaign
        </button>
      </div>
      {showCreateCampaign && (
        <div className="tw-mb-6 tw-rounded-xl tw-border tw-border-gray-200 tw-bg-white tw-p-6 tw-shadow-lg">
          <h2 className="tw-mb-4 tw-text-xl tw-font-semibold tw-text-gray-700">
            Create New Campaign
          </h2>
          <Formik
            initialValues={{
              campaignName: '',
              messageContent: '',
              recipientList: null,
              scheduleTime: null,
              category: null
            }}
            validationSchema={campaignSchema}
            onSubmit={(values, {resetForm}) => {
              console.log('Campaign Data Submitted: ', values)
              closeCreateCampaign()
              resetForm()
            }}
          >
            {({setFieldValue, values}) => (
              <Form className="tw-space-y-4">
                <div>
                  <label htmlFor="campaignName" className="tw-mb-1 tw-block tw-text-gray-600">
                    Campaign Name
                  </label>
                  <Field
                    name="campaignName"
                    type="text"
                    className="tw-w-full tw-rounded-lg tw-border tw-px-4 tw-py-2 tw-shadow-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-400"
                  />
                  <ErrorMessage
                    name="campaignName"
                    component="div"
                    className="tw-text-sm tw-text-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="messageContent" className="tw-mb-1 tw-block tw-text-gray-600">
                    Message Content
                  </label>
                  <Field
                    name="messageContent"
                    as="textarea"
                    className="tw-w-full tw-rounded-lg tw-border tw-px-4 tw-py-2 tw-shadow-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-400"
                  />
                  <ErrorMessage
                    name="messageContent"
                    component="div"
                    className="tw-text-sm tw-text-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="recipientList" className="tw-mb-1 tw-block tw-text-gray-600">
                    Recipient List (Upload CSV)
                  </label>
                  <input
                    id="recipientList"
                    type="file"
                    onChange={(event) => setFieldValue('recipientList', event.target.files[0])}
                    className="tw-w-full tw-rounded-lg tw-border tw-px-4 tw-py-2 tw-shadow-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-400"
                  />
                  <ErrorMessage
                    name="recipientList"
                    component="div"
                    className="tw-text-sm tw-text-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="scheduleTime" className="tw-mb-1 tw-block tw-text-gray-600">
                    Schedule Time
                  </label>
                  <DatePicker value={rangeValue} onChange={setRangeValue} />
                  <ErrorMessage
                    name="scheduleTime"
                    component="div"
                    className="tw-text-sm tw-text-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="tw-mb-1 tw-block tw-text-gray-600">
                    Category
                  </label>
                  <Select
                    options={categoryOptions}
                    onChange={(option) => setFieldValue('category', option)}
                    className="tw-w-full tw-rounded-lg tw-shadow-sm"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="tw-text-sm tw-text-red-500"
                  />
                </div>

                <div className="tw-flex tw-justify-end tw-space-x-4">
                  <button
                    type="button"
                    onClick={closeCreateCampaign}
                    className="tw-rounded-lg tw-bg-gray-500 tw-px-4 tw-py-2 tw-text-white hover:tw-bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="tw-rounded-lg tw-bg-green-500 tw-px-4 tw-py-2 tw-text-white hover:tw-bg-green-600"
                  >
                    Create Campaign
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
      <div className="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-3">
        {metrics.map((metric, index) => (
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
                  Success: <strong className="tw-text-gray-800">{metric.success}</strong>
                </span>
              </p>
              <p className="tw-flex tw-items-center tw-space-x-2">
                <XCircle className="tw-text-red-500" />
                <span>
                  Failures: <strong className="tw-text-gray-800">{metric.failures}</strong>
                </span>
              </p>
              <p className="tw-flex tw-items-center tw-space-x-2">
                <PieChart className="tw-text-purple-500" />
                <span>
                  Open Rate: <strong className="tw-text-gray-800">{metric.openRate}%</strong>
                </span>
              </p>
              <p>
                Total: <strong className="tw-text-gray-800">{metric.total}</strong>
              </p>
            </div>
            <div className="tw-mt-4">
              <div className="tw-relative tw-h-2 tw-rounded-full tw-bg-gray-300">
                <div
                  className="tw-absolute tw-left-0 tw-top-0 tw-h-full tw-rounded-full tw-bg-green-500"
                  style={{
                    width: `${(metric.success / metric.total) * 100 || 0}%`
                  }}
                ></div>
                <div
                  className="tw-absolute tw-top-0 tw-h-full tw-rounded-full tw-bg-red-500"
                  style={{
                    left: `${(metric.success / metric.total) * 100 || 0}%`,
                    width: `${(metric.failures / metric.total) * 100 || 0}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
