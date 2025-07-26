import { Form, useForm } from 'react-hook-form';

import {
  UserRegisterSchema,
  RegisterFormFields,
} from '../../models/zod/UserRegisterSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';

export default function RegisterForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(UserRegisterSchema),
  });

  return (
    <Form
      action="/api/registerUser"
      onSuccess={() => {
        alert('you good');
      }}
      onError={() => {
        alert('you not good');
      }}
      control={control}
    >
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
          type="text"
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
      <div className="card-actions">
        <button className="btn btn-accent" type="submit">
          Register
        </button>
      </div>
    </Form>
  );
}
