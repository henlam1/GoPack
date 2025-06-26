// Generic error messages to display to users
const errorMessages: Record<number, string> = {
  400: "Bad request, please try again",
  401: "Invalid username or password",
  404: "Resource not found",
  500: "Server error. Please try again later",
};

export default errorMessages;
