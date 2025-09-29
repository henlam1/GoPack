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
import { FormInput } from './FormInput.tsx';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

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

            <FormInput
              label="Email"
              type="text"
              placeholder="mail@site.com"
              {...register('email')}
              error={errors.email?.message}
            />

            {errors.root && (
              <p className="text-error text-center mb-2">
                {errors.root.message}
              </p>
            )}

            <button
              disabled={isSubmitting}
              className="btn btn-accent"
              type="submit"
            >
              {isSubmitting ? 'Loading...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
