import {usePersistState} from '@/hooks/usePersistState'

export function usePersistTab() {
  return usePersistState<'favorite' | 'admin' | 'mine'>('ACTIVE_QUICK_RESPONSE_TAB', 'favorite')
}
