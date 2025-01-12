import {SnackbarProvider} from 'notistack'
import {Outlet} from 'react-router-dom'

export function App() {
  return (
    <>
      <SnackbarProvider />
      <Outlet />
    </>
  )
}
