import {useEffect, useRef, useState} from 'react'

import {isElementScrolledToBottom} from '@/utils/Common'

export function useIsScrollToBottom<T extends HTMLElement>(
  scrollElementRef: React.MutableRefObject<T | null>
) {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)
  const isScrolledToBottomCacheRef = useRef(isScrolledToBottom)

  useEffect(() => {
    const scrollElement = scrollElementRef.current

    if (!scrollElement) {
      return
    }

    function handleScroll() {
      if (!scrollElement) {
        return
      }

      const isScrolledToBottom = isElementScrolledToBottom(scrollElement, 50)

      if (isScrolledToBottomCacheRef.current !== isScrolledToBottom) {
        setIsScrolledToBottom(isScrolledToBottom)
      }

      isScrolledToBottomCacheRef.current = isScrolledToBottom
    }

    scrollElement.addEventListener('scroll', handleScroll)

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [scrollElementRef])

  return isScrolledToBottom
}
