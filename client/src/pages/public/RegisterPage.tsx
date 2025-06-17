import RegisterForm from "../../components/forms/RegisterForm";

export default function RegisterPage() {

  return (
    <div className="flex justify-center items-center">
      <div className="card card-border bg-primary w-96 shadow-lg">
        <div className="card-body items-center">
          <h2 className="card-title text-4xl font-bold mb-5 text-primary-content">Register</h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}