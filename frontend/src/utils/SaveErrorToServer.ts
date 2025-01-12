import {localAuth} from '@/store/LocalAuth'

import {api} from '@/utils/Axios'
import {LocalJson} from '@/utils/LocalJSON'

interface SaveErrorRequestBody {
  type: 'CLIENT_ERROR'
  company_id: number | 'NOT_AUTHENTICATED'
  errors: SaveToServerError[]
}

type SaveToServerError = {
  /** Low | Medium | High */
  priority: 'L' | 'M' | 'H'
} & Record<string, unknown>

const errorsForServerStorages = new LocalJson<Array<SaveToServerError>>('errors-for-server')

export async function storeError(error: SaveToServerError) {
  const errors = errorsForServerStorages.get() ?? []
  errors.push(error)
  errorsForServerStorages.set(errors)
}

async function saveErrorsToServer() {
  const authUser = localAuth.get()
  const errors = errorsForServerStorages.get() ?? []

  if (errors.length === 0) {
    return
  }

  try {
    const {data} = await api.post<{success: boolean}>('/save-error-log', {
      type: 'CLIENT_ERROR',
      company_id: authUser ? authUser.company_name_id : 'NOT_AUTHENTICATED',
      errors
    } satisfies SaveErrorRequestBody)

    if (data.success) {
      errorsForServerStorages.set(null)
    }
  } catch {
    //
  }
}

// todo: should we put it into react scope?
function initErrorSavingInterval() {
  const intervalId = window.setInterval(saveErrorsToServer, 10_000) // 10 seconds

  return () => {
    window.clearInterval(intervalId)
  }
}

initErrorSavingInterval()
