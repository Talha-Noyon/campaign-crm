import {useState} from 'react'

import {Details} from '@/pages/profile/Details'

import {useStore} from '@/store'

import {toAbsoluteUrl} from '@/utils/Common'

export default function ProfilePage() {
  const user = useStore((state) => state.user)
  const [tab, setTab] = useState<'DETAILS' | 'PROFILE_UPDATE' | 'PASSWORD_UPDATE'>('DETAILS')

  return user ? (
    <div className="card">
      <div className="card-body p-9">
        <div className="d-flex flex-column align-items-center text-center">
          <div className="mb-5">
            <div className="symbol symbol-75px symbol-circle">
              <img alt="Pic" src={toAbsoluteUrl('/media/users/defaultProfile.jpg')} />
            </div>
          </div>
          <h2 className="fs-2 fw-bolder mb-0 tw-text-secondary-800">
            {user.firstName} {user.lastName}
          </h2>
          <div className="fw-bold mb-6 mt-1 tw-text-secondary-400">{user.type}</div>
        </div>
        <div className="card mb-5 mb-xl-10 mw-950px mx-auto">
          <div className="tw-border-reset tw-flex tw-flex-col tw-items-center tw-border-b tw-border-secondary-100 tw-p-4 md:tw-flex-row">
            <h3 className="m-0 tw-grow tw-py-2">Profile Details</h3>
            <div className="tw-mt-4 tw-flex tw-gap-3 tw-self-center md:tw-mt-0">
              {tab === 'DETAILS' ? (
                <>
                  <button className="btn btn-outline" onClick={() => setTab('PASSWORD_UPDATE')}>
                    Edit password
                  </button>
                  <button className="btn btn-primary" onClick={() => setTab('PROFILE_UPDATE')}>
                    Edit profile
                  </button>
                </>
              ) : (
                <button className="btn btn-light" onClick={() => setTab('DETAILS')}>
                  Cancel
                </button>
              )}
            </div>
          </div>
          {tab === 'PROFILE_UPDATE' ? (
            <ProfileUpdateForm onSuccess={() => setTab('DETAILS')} />
          ) : tab === 'PASSWORD_UPDATE' ? (
            <PasswordUpdateForm onSuccess={() => setTab('DETAILS')} />
          ) : (
            <Details />
          )}
        </div>
      </div>
    </div>
  ) : null
}
