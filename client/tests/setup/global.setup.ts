// client/tests/setup/global.setup.ts
import auth from './auth.setup';

async function globalSetup() {
  await auth();
}

export default globalSetup;
