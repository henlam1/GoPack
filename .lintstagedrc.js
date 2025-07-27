module.exports = {
  'client/**/*.{js,ts,jsx,tsx}': [
    'npx eslint --config client/eslint.config.js --ext .js,.ts,.jsx,.tsx',
    'npm run format:client'
  ],
  'server/**/*.{js,ts}': [
    'npx eslint --config server/eslint.config.js --ext .js,.ts',
    'npm run format:server'
  ]
};
