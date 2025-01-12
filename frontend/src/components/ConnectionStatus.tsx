import {AlertCircleIcon, LoaderIcon} from 'lucide-react'

import {useStore} from '@/store'

export function ConnectionStatus() {
  const isOnline = useStore((state) => state.isOnline)
  const socketStatus = useStore((state) => state.socketStatus)

  const status = !isOnline ? 'OFFLINE' : !socketStatus ? 'CONNECTING' : 'CONNECTED'

  return (
    status !== 'CONNECTED' && (
      <div className="tw-fixed tw-bottom-0 tw-left-0 tw-z-50 tw-w-full tw-max-w-xs">
        <div className="tw-border-reset tw-m-4 tw-flex tw-items-center tw-gap-2 tw-rounded-lg tw-border tw-border-red-200 tw-bg-red-50 tw-p-3 tw-text-red-600 tw-shadow-around">
          {status === 'OFFLINE' && (
            <>
              <AlertCircleIcon className="tw-size-5" /> No internet connection
            </>
          )}
          {status === 'CONNECTING' && (
            <>
              <LoaderIcon className="tw-size-5 tw-animate-spin" /> Connecting...
            </>
          )}
        </div>
      </div>
    )
  )
}
