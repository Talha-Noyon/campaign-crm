import {useStore} from '@/store'

export function Details() {
  const user = useStore((state) => state.user)

  return user ? (
    <div className="card-body p-9">
      <div className="row mb-7">
        <label className="col-lg-4 fw-bold text-muted">Full Name</label>

        <div className="col-lg-8">
          <span className="fw-bolder fs-6 text-dark">{`${user.firstName} ${user.lastName}`}</span>
        </div>
      </div>

      <div className="row mb-7">
        <label className="col-lg-4 fw-bold text-muted">Company</label>

        <div className="col-lg-8 fv-row">
          <span className="fw-bold fs-6">{user.companyName}</span>
        </div>
      </div>

      <div className="row mb-7">
        <label className="col-lg-4 fw-bold text-muted">Email</label>

        <div className="col-lg-8 d-flex align-items-center">
          <span className="fw-bolder fs-6 me-2">{user.email}</span>
        </div>
      </div>

      <div className="row mb-7">
        <label className="col-lg-4 fw-bold text-muted">Mobile</label>

        <div className="col-lg-8 d-flex align-items-center">
          <span className="fw-bolder fs-6 me-2">{user.mobile}</span>
        </div>
      </div>

      <div className="row mb-7">
        <label className="col-lg-4 fw-bold text-muted">Location</label>

        <div className="col-lg-8 d-flex align-items-center">
          <span className="fw-bolder fs-6 me-2">BD</span>
        </div>
      </div>

      <div className="row mb-7">
        <label className="col-lg-4 fw-bold text-muted">Join date</label>

        <div className="col-lg-8">
          <span className="fw-bold fs-6 text-dark text-hover-primary">
            {new Date(user.date).toDateString()}
          </span>
        </div>
      </div>

      <div className="row mb-7">
        <label className="col-lg-4 fw-bold text-muted">Status</label>

        <div className="col-lg-8">
          <span className="badge badge-success">Active</span>
        </div>
      </div>
    </div>
  ) : null
}
