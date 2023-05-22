export class CustomError extends Error {
  statusCode: string;

  constructor(message: string, statusCode: string) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode;
  }
}
