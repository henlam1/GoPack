class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // operational errors are expected
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = "Invalid input") {
    super(message, 400);
  }
}

class AuthError extends AppError {
  constructor(message = "Authentication failed") {
    super(message, 401);
  }
}

export { NotFoundError, ValidationError, AuthError };
