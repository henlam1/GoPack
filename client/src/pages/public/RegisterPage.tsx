export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="card card-border bg-base-100 w-96 shadow-lg">
        <div className="card-body items-center">
          <h2 className="card-title text-4xl font-bold mb-5">Register</h2>
          <label className="floating-label">
            <span>Username</span>
            <input type="text" placeholder="username" className="input input-md" />
          </label>          
          <label className="floating-label">
            <span>Password</span>
            <input type="text" placeholder="password" className="input input-md" />
          </label>
          <label className="floating-label">
            <span>Email</span>
            <input type="text" placeholder="mail@site.com" className="input input-md" />
          </label>
          <div className="card-actions">
            <button className="btn btn-primary">Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}