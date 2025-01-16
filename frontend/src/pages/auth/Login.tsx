import {AxiosError} from 'axios'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'

import {getAuthPathname} from '@/hooks/useSyncAuthPathname'
import {useStore} from '@/store'
import {useAuth} from '@/store/Auth'

import {socket} from '@/utils/Socket'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required')
})

const initialValues = {
  email: 'manager@example.com',
  password: 'manager@example.com'
}

export function Login() {
  const navigate = useNavigate()
  const [role, setRole] = useState('campaign_manager')
  const [loading, setLoading] = useState(false)
  const {login} = useAuth()
  const setAuth = useStore((state) => state.setAuth)
  const handleRoleSwitch = (selectedRole: string) => {
    setRole(selectedRole)
    formik.setValues({
      email: selectedRole === 'admin' ? 'admin@example.com' : 'manager@example.com',
      password: selectedRole === 'admin' ? 'admin@example.com' : 'manager@example.com'
    })
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {token} = await login(values)
        socket.emit('set-user-room', {token})
        const pathname = getAuthPathname()
        if (pathname) {
          navigate(pathname)
        }
      } catch (error) {
        console.error(error)
        if (error instanceof AxiosError && error.status === 403 && error?.response?.data) {
          setStatus(error.response.data)
        } else {
          setStatus('Incorrect login details')
        }
        setAuth(null)
        setSubmitting(false)
        setLoading(false)
      }
    }
  })

  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-bg-gray-100">
      <form
        className="tw-w-full tw-max-w-md tw-space-y-6 tw-rounded-lg tw-bg-white tw-p-8 tw-shadow-lg"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        {formik.status && (
          <div className="tw-rounded-md tw-bg-red-100 tw-p-4 tw-text-sm tw-text-red-700">
            {formik.status}
          </div>
        )}
        {/* Role Toggle Buttons */}
        <div className="tw-mb-6 tw-flex tw-justify-center">
          <button
            type="button"
            className={clsx(
              'tw-btn tw-rounded-l-lg tw-px-4 tw-py-2 tw-text-sm tw-font-semibold',
              role === 'campaign_manager'
                ? 'tw-bg-blue-600 tw-text-white'
                : 'tw-bg-gray-200 tw-text-gray-700'
            )}
            onClick={() => handleRoleSwitch('campaign_manager')}
          >
            Campaign Manager
          </button>
          <button
            type="button"
            className={clsx(
              'tw-btn tw-rounded-r-lg tw-px-4 tw-py-2 tw-text-sm tw-font-semibold',
              role === 'admin' ? 'tw-bg-blue-600 tw-text-white' : 'tw-bg-gray-200 tw-text-gray-700'
            )}
            onClick={() => handleRoleSwitch('admin')}
          >
            Admin
          </button>
        </div>
        <div>
          <label
            className="tw-mb-1 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="off"
            {...formik.getFieldProps('email')}
            className={`tw-block tw-w-full tw-rounded-md tw-border ${
              formik.touched.email && formik.errors.email
                ? 'tw-border-red-500'
                : 'tw-border-gray-300'
            } tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-indigo-500 tw-focus:border-indigo-500 tw-px-3 tw-py-2`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="tw-mt-2 tw-text-sm tw-text-red-600">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label
            className="tw-mb-1 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="off"
            {...formik.getFieldProps('password')}
            className={`tw-block tw-w-full tw-rounded-md tw-border ${
              formik.touched.password && formik.errors.password
                ? 'tw-border-red-500'
                : 'tw-border-gray-300'
            } tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-indigo-500 tw-focus:border-indigo-500 tw-px-3 tw-py-2`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="tw-mt-2 tw-text-sm tw-text-red-600">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className={`tw-btn tw-flex tw-w-full tw-justify-center tw-rounded-md tw-px-4 tw-py-2 tw-text-white ${
            formik.isSubmitting || !formik.isValid
              ? 'tw-bg-gray-400'
              : 'tw-bg-indigo-600 hover:tw-bg-indigo-700'
          } tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-offset-2 tw-focus:ring-indigo-500`}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {loading ? (
            <span className="tw-flex tw-items-center">
              <span className="spinner-border spinner-border-sm tw-mr-2"></span>
              Signing In...
            </span>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="tw-mt-4 tw-text-center tw-text-sm tw-text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="tw-text-indigo-600 hover:tw-underline">
            Register here
          </a>
        </div>
      </form>
    </div>
  )
}
