import {Navigate, Route, Routes} from 'react-router-dom'

import Layout from '@/components/layout'
import Dashboard from '@/pages/dashboard/DashboardPage'
import ProfilePage from '@/pages/profile/ProfilePage'

export function PrivateRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate replace to="/error/404" />} />
      </Route>
    </Routes>
  )
}
