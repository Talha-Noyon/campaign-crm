import {useRef, useState} from 'react'

import {useClickAway} from '@/hooks/useClickAway'

export function useOverlay<
  E1 extends HTMLElement = HTMLElement,
  E2 extends HTMLElement = HTMLElement
>(defaultState: boolean) {
  const [open, setOpen] = useState(defaultState)

  const safeArea1Ref = useRef<E1 | null>(null)
  const safeArea2Ref = useRef<E2 | null>(null)

  useClickAway([safeArea1Ref, safeArea2Ref], () => setOpen(false))

  return [open, setOpen, safeArea1Ref, safeArea2Ref] as const
}
