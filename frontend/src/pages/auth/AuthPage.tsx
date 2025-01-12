import {Route, Routes} from 'react-router-dom'

import {AuthLayout} from '@/pages/auth/AuthLayout'
import {Login} from '@/pages/auth/Login'

export const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)
