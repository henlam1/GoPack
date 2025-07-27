import { useForm } from 'react-hook-form';
import {
  UserRegisterSchema,
  RegisterFormFields,
} from '../../models/zod/UserRegisterSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { registerAPI } from '../../services/api/users.ts';
import { APIError } from '../../services/errors/errorTypes.ts';
import publicRoutes from '../../routes/publicRoutes.ts';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(UserRegisterSchema),
  });

  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: registerAPI,
    onSuccess: () => {
      navigate(publicRoutes.login);
    },
    onError: (error) => {
      if (error instanceof APIError) {
        setError('root', { message: 'Invalid username or email' });
      } else {
        setError('root', { message: 'Network error' });
      }
    },
  });

  async function onSubmit(data: RegisterFormFields) {
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
          {...register('username')}
        />
        {errors.username && (
          <p className="text-error-content w-70">{errors.username.message}</p>
        )}
      </label>
      <label className="floating-label mb-2">
        <span>Password</span>
        <input
          type="password"
          placeholder="password"
          className="input w-70"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-error-content w-70">{errors.password.message}</p>
        )}
      </label>
      <label className="floating-label mb-2">
        <span>Email</span>
        <input
          type="email"
          placeholder="mail@site.com"
          className="input w-70"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-error-content w-70">{errors.email.message}</p>
        )}
      </label>
      <label className="floating-label mb-2">
        {errors.root && (
          <p className="text-error-content w-70">{errors.root.message}</p>
        )}
      </label>
      <div className="card-actions">
        <button className="btn btn-accent" type="submit">
          Register
        </button>
      </div>
    </form>
  );
}
