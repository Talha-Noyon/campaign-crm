import {useState} from 'react'

import {isDiff} from '@/utils/Common'

export function useOnUpdate<T extends Readonly<unknown[]>>(cb: (prevDeps: T) => void, deps: T) {
  const [prevDeps, setPrevDeps] = useState(deps)

  if (isDiff(prevDeps, deps)) {
    setPrevDeps(deps)
    cb(prevDeps)
  }
}
