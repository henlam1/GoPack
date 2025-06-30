export class APIError extends Error {
  message: string;
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "APIError";
    this.message = message;
    this.status = status;
  }
}

export class TokenError extends Error {
  message: string;
  status: number = 401;

  constructor(message: string) {
    super(message);
    this.name = "TokenError";
    this.message = message;
  }
}

export class NetworkError extends Error {
  message: string;
  error: unknown;

  constructor(message: string, error: unknown) {
    super(message);
    this.message = message;
    this.error = error;
  }
}
