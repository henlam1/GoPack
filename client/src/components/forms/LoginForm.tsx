import { useForm } from "react-hook-form";
import {
  LoginFormFields,
  LoginSchema,
  LoginDefaults,
} from "../../models/zod/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAPI } from "../../services/api/users";
import { useMutation } from "@tanstack/react-query";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    defaultValues: LoginDefaults,
    resolver: zodResolver(LoginSchema),
  });

  const { mutate } = useMutation({
    mutationFn: loginAPI,
  });

  async function onSubmit(data: LoginFormFields) {
    mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="floating-label mb-2">
        <span>Username</span>
        <input
          type="text"
          placeholder="username"
          className="input w-70"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-error-content w-70">{errors.username.message}</p>
        )}
      </label>
      <label className="floating-label mb-2">
        <span>Password</span>
        <input
          type="text"
          placeholder="password"
          className="input w-70"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-error-content w-70">{errors.password.message}</p>
        )}
      </label>
      <div className="card-actions">
        <button className="btn btn-accent" type="submit">
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </div>
    </form>
  );
}
