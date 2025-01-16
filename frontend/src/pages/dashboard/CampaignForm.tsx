import {type CampaignDataParams} from '@shared/types'
import Tagify, {type TagifyTagsReactProps} from '@yaireo/tagify/dist/react.tagify'
import '@yaireo/tagify/dist/tagify.css'
import {ErrorMessage, Field, Formik} from 'formik'
import Select from 'react-select'
import * as Yup from 'yup'

import {DatePicker} from '@/components/DatePicker'

import {createCampaign} from '@/api'

import {getTodayRangeValue} from '@/utils/Common'

// import {socket} from '@/utils/Socket'

const settings: TagifyTagsReactProps['settings'] = {
  blacklist: [],
  backspace: 'edit',
  placeholder: 'Type Email',
  editTags: 1,
  dropdown: {
    enabled: 0
  },
  pattern:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  callbacks: {
    invalid(e) {
      const text = e.detail.data.value
      const tagify = e.detail.tagify
      const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
      const matches = text.match(emailRegex)
      if (matches) {
        for (const match of matches) {
          tagify.addTags(match)
        }
      }
    }
  }
}
const campaignSchema = Yup.object().shape({
  campaignName: Yup.string()
    .required('Campaign Name is required')
    .max(50, "Campaign Name can't exceed 50 characters"),
  messageContent: Yup.string()
    .required('Message Content is required')
    .max(500, "Message Content can't exceed 500 characters"),
  recipients: Yup.array()
    .of(Yup.string().email('Invalid email format')) // Ensure each item is a valid email
    .required('Recipient list is required')
    .min(1, 'At least one recipient is required')
    .max(100, 'Cannot exceed 100 recipients'),
  scheduleTime: Yup.object().shape({
    start: Yup.string().required(),
    end: Yup.string().required()
  }),
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

type Props = {
  toggleCampaignForm: () => void
  getCampaign: () => void
}

const CampaignForm: React.FC<Props> = ({toggleCampaignForm, getCampaign}) => {
  const {start, end} = getTodayRangeValue()
  return (
    <div className="tw-mb-6 tw-rounded-xl tw-border tw-border-gray-200 tw-bg-white tw-p-6 tw-shadow-lg">
      <h2 className="tw-mb-4 tw-text-xl tw-font-semibold tw-text-gray-700">Create New Campaign</h2>
      <Formik
        initialValues={{
          campaignName: '',
          messageContent: '',
          recipients: [],
          scheduleTime: {start: start.toString(), end: end.toString()}
        }}
        validationSchema={campaignSchema}
        onSubmit={async (values, {resetForm}) => {
          console.log('Campaign Data Submitted: ', values)
          const response = await createCampaign(values)
          console.log({response})
          toggleCampaignForm()
          getCampaign()
          resetForm()
        }}
      >
        {({setFieldValue, values, handleSubmit}) => (
          <form className="tw-space-y-4" onSubmit={handleSubmit}>
            <div className="tw-grid tw-grid-cols-1 tw-gap-2 md:tw-grid-cols-2 lg:tw-grid-cols-2">
              <div>
                <div>
                  <label htmlFor="campaignName" className="tw-mb-1 tw-block tw-text-gray-600">
                    Campaign Name
                  </label>
                  <Field name="campaignName" type="text" className="tw-form-control tw-mb-1" />
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
                    rows="5"
                    className="tw-form-control tw-mb-1"
                  />
                  <ErrorMessage
                    name="messageContent"
                    component="div"
                    className="tw-text-sm tw-text-red-500"
                  />
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="recipients" className="tw-block tw-text-gray-600">
                    Recipient List
                  </label>
                  <div className="tw-grid tw-grid-cols-[80%_20%] tw-gap-2">
                    <div>
                      <Tagify
                        className="tw-mb-1 tw-w-full tw-grow tw-rounded-lg tw-shadow-sm"
                        name="recipients"
                        value={values.recipients}
                        onChange={(e) => {
                          try {
                            if (e) {
                              let values = []
                              if (e.detail?.value) {
                                if (JSON.parse(e.detail.value)) {
                                  values = JSON.parse(e.detail.value)
                                  values = values.map((x) => x.value)
                                  setFieldValue('recipients', values)
                                }
                              } else {
                                setFieldValue('recipients', [])
                              }
                            }
                          } catch (error) {
                            console.log(error)
                          }
                        }}
                        placeholder="Add emails..."
                        settings={settings}
                      />
                      <ErrorMessage
                        name="recipients"
                        component="div"
                        className="tw-text-sm tw-text-red-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setFieldValue('recipients', [])}
                      className="tw-btn tw-rounded-lg tw-bg-red-500 tw-px-4 tw-py-2 tw-text-white hover:tw-bg-red-600"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="scheduleTime" className="tw-mb-1 tw-block tw-text-gray-600">
                    Schedule Time
                  </label>
                  <DatePicker
                    onChange={(range) => {
                      setFieldValue('scheduleTime', {
                        start: range?.start.toString(),
                        end: range?.end.toString()
                      })
                    }}
                  />
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
                    className="tw-mb-1 tw-w-full tw-rounded-lg tw-shadow-sm"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="tw-text-sm tw-text-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="tw-flex tw-justify-end tw-space-x-2">
              <button
                type="button"
                onClick={toggleCampaignForm}
                className="tw-btn tw-rounded-lg tw-bg-gray-500 tw-px-4 tw-py-2 tw-text-white hover:tw-bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="tw-btn tw-rounded-lg tw-bg-green-500 tw-px-4 tw-py-2 tw-text-white hover:tw-bg-green-600"
              >
                Create Campaign
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default CampaignForm
