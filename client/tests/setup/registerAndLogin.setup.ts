import { register } from './register.setup';
import { login } from './login.setup';

export async function registerAndLogin(page) {
  await register(page);
  await login(page);
}
