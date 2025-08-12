const getEnv = () => {
  const env = process.env.NODE_ENV || 'development';
  return {
    isProd: env === 'production',
    isDev: env === 'development',
    isTest: env === 'test',
  };
};

export default getEnv;
