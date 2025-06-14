export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="card bg-primary w-96 shadow-lg">
        <div className="card-body items-center">
          <h2 className="card-title">Register</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <label className="input">
            <span className="label">Username</span>
            <input type="text" placeholder="username" />
          </label>
          <label className="input">
            <span className="label">Password</span>
            <input type="text" placeholder="password" />
          </label>          
          <label className="input">
            <span className="label">Email</span>
            <input type="text" placeholder="email" />
          </label>
          <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}