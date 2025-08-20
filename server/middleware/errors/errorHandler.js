const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.log(`Error code: ${statusCode}, message: ${message}`);
  res.status(statusCode).json({
    message: message,
  });
};

export default errorHandler;
