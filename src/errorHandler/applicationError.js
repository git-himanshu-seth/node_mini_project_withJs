export class ApplicationError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}
