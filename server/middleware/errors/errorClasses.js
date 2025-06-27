class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // operational errors are expected
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Invalid input") {
    super(message, 400);
  }
}

export class AuthError extends AppError {
  constructor(message = "Authentication failed") {
    super(message, 401);
  }
}

export class UserExistsError extends AppError {
  constructor(message = "User already exists") {
    super(message, 409);
  }
}
