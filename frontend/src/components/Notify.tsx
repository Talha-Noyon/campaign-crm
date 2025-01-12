import {XIcon} from 'lucide-react'
import {type BaseVariant, closeSnackbar, enqueueSnackbar} from 'notistack'

export function notify(message: string, variant: BaseVariant) {
  enqueueSnackbar(message ?? 'Unknown error (Notify)', {
    hideIconVariant: true,
    variant: variant ?? 'error',
    action: (id) => {
      return (
        <button
          className="tw-inline-flex tw-rounded-full tw-border-0 tw-bg-secondary-900/10 tw-p-1 tw-text-white hover:tw-bg-secondary-900/15"
          onClick={() => closeSnackbar(id)}
        >
          <XIcon className="tw-size-5" />
        </button>
      )
    }
  })
}
