import {useMutation, useQuery} from '@tanstack/react-query'
import {sleep} from '@/utils/Common'
import {fetcher} from '@/api/fetcher'
import {useStore} from '@/store'
import {getLocalAuth} from '@/store/LocalAuth'
type CompanyInfo = {
  _id: string
  form_active: boolean
  transfer_enabled: boolean
  form_mandatory: boolean
}
// company
export function useCompany() {
  return useQuery({
    queryKey: ['company'],
    queryFn: getCompany
  })
}

function getCompany() {
  return fetcher<CompanyInfo>('/get-company-info')
}

export function useSignOut() {
  const setAuth = useStore((state) => state.setAuth)

  return useMutation({
    mutationFn: signOut,
    async onSuccess() {
      setAuth(null)
      await sleep(1000)
      window.location.reload()
    }
  })
}

async function signOut() {
  const authUser = getLocalAuth()

  return await fetcher<{assignmentExists: boolean; msg: string}>('/update-logout-session', {
    method: 'POST',
    json: {
      user_id: authUser._id,
      user_login_session_id: authUser.token
    }
  })
}
