import { useForm } from 'react-hook-form';
import { LoginFormFields, LoginSchema } from '../../models/zod/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginAPI } from '../../services/api/users';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import privateRoutes from '../../routes/privateRoutes';
import { APIError } from '../../services/errors/errorTypes';
import { useAuth } from '../../hooks/useAuth';
import { FormInput } from './FormInput';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormFields>({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { mutate } = useMutation({
    mutationFn: loginAPI,
    onSuccess: (data: { email: string; message: string }) => {
      setUser(data.email);
      navigate(privateRoutes.home);
    },
    onError: (error) => {
      if (error instanceof APIError) {
        setError('root', { message: 'Invalid username or password' });
      } else {
        setError('root', { message: 'Network error' });
      }
    },
  });

  const onSubmit = (data: LoginFormFields) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card p-6 bg-base-100 max-w-md mx-auto"
          >
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

            <FormInput
              label="Username"
              placeholder="username"
              {...register('username')}
              error={errors.username?.message}
            />

            <FormInput
              label="Password"
              type="password"
              placeholder="password"
              {...register('password')}
              error={errors.password?.message}
            />

            {errors.root && (
              <p className="text-error text-center mb-2">
                {errors.root.message}
              </p>
            )}

            <button
              disabled={isSubmitting}
              className="btn btn-accent mt-6"
              type="submit"
            >
              {isSubmitting ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
