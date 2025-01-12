import {Navigate, Route, Routes} from 'react-router-dom'

import {Error404} from '@/components/errors/Error404'
import {AuthPage} from '@/pages/auth/AuthPage'
import {Logout} from '@/pages/auth/Logout'
import {PrivateRoutes} from '@/routing/PrivateRoutes'

import {useHandleInvalidSession} from '@/hooks/useHandleInvalidSession'
import {useHideSplashScreen} from '@/hooks/useHideSplashScreen'
import {useInitSocketStatus} from '@/hooks/useInitSocketStatus'
import {useReloadOnStorageChange} from '@/hooks/useReloadOnStorageChange'
import {useAuth} from '@/store/Auth'

import {App} from '@/App'

const AppRoutes = () => {
  const {auth} = useAuth()

  return (
    <>
      <Init />
      <Routes>
        <Route element={<App />}>
          <Route path="404" element={<Error404 />} />
          <Route path="logout" element={<Logout />} />
          {auth ? (
            <>
              <Route path="*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </>
  )
}

function Init() {
  useHideSplashScreen()
  useReloadOnStorageChange()
  useInitSocketStatus()
  useHandleInvalidSession()

  return null
}

export {AppRoutes}
