import {LocalJsonMap} from '@/utils/LocalJSON'

export const crmStorage = new LocalJsonMap<{
  createdBy: string
  source: string
  data: Array<{
    label: string
    value: string
    metaData?: Record<string, string>
  }>
}>('CRM_INPUT_MAP')
