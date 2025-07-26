module.exports = {
  'client/**/*.{js,ts,jsx,tsx}': [
    'npm run lint:client',
    'npm run format:client'
  ],
  'server/**/*.{js,ts}': [
    'npm run lint:server',
    'npm run format:server'
  ]
};
