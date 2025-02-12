const errorMap = {
  // User Errors
  UserExistsError: 409,
  PasswordValidationError: 400,
  MissingFieldsError: 400,
  UserNotVerifiedError: 403,
  InvalidCredentialsError: 401,
};

module.exports = errorMap;