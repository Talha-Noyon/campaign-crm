import {useEffect} from 'react'

declare global {
  interface Window {
    APP_BOOT_TIME: number
  }
}

const SPLASH_DURATION = 2300 // milliseconds

export function useHideSplashScreen() {
  useEffect(() => {
    let timeId: number | undefined

    const spent = Date.now() - window.APP_BOOT_TIME

    if (spent >= SPLASH_DURATION) {
      hideSplashScreen()
    } else {
      timeId = window.setTimeout(hideSplashScreen, SPLASH_DURATION - spent)
    }

    return () => {
      window.clearTimeout(timeId)
    }
  }, [])
}

// utils
function hideSplashScreen() {
  const splashScreen = document.getElementById('splash-screen')

  if (splashScreen) {
    splashScreen.style.display = 'none'
  }
}
