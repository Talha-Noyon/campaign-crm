import {type MutableRefObject, useCallback, useEffect} from 'react'

export function useFocusOnMount(
  elementRef: MutableRefObject<HTMLElement | null>,
  {onMount = false}: {onMount?: boolean} = {}
) {
  const focus = useCallback(() => {
    elementRef.current?.focus()
  }, [elementRef])

  useEffect(() => {
    if (onMount) {
      focus()
    }
  }, [onMount, focus])

  return focus
}
