const errorMap = require("./errorConfig");

const errorHandler = (err, req, res, next) => {
  const statusCode = errorMap[err.name] || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ 
    "status": "error",
    "error": {
      "code": statusCode,
      "message": message,
    }
   });
};

module.exports = errorHandler;
