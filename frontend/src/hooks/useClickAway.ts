import {type MutableRefObject, useEffect} from 'react'

export function useClickAway(
  elements: Array<MutableRefObject<HTMLElement | null>>,
  onClickAway: (e: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    function handler(e: MouseEvent | TouchEvent) {
      if (elements.every((element) => !contains(element.current, e.target))) {
        onClickAway(e)
      }
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  })
}

// utils
function contains(parent: unknown, child: unknown) {
  return parent instanceof HTMLElement && child instanceof Node && parent.contains(child)
}
