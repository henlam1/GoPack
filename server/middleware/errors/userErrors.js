class UserExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserExistsError";
    this.statusCode = 409;
  }
}

class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotFoundError";
    this.statusCode = 404;
  }
}

class PasswordValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "PasswordValidationError";
    this.statusCode = 400;
  }
}

class MissingFieldsError extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingFieldsError";
    this.statusCode = 400;
  }
}

class UserNotVerifiedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotVerifiedError";
    this.statusCode = 403;
  }
}

class InvalidCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidCredentialsError";
    this.statusCode = 401;
  }
}

module.exports = {
  UserExistsError,
  UserNotFoundError,
  PasswordValidationError,
  MissingFieldsError,
  UserNotVerifiedError,
  InvalidCredentialsError,
};
