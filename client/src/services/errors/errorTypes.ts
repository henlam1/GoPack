class APIError extends Error {
  message: string;
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

export default APIError;
