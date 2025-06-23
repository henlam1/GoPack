import LoginForm from "../../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="card card-border bg-primary w-96 shadow-lg">
        <div className="card-body items-center">
          <h2 className="card-title text-4xl font-bold mb-5 text-primary-content">
            Login
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
