// Custom error handling function
export class InvalidInput extends Error {
  constructor(
    public messageDetails: { message: string; code: string },
    public httpStatusCode?: number,
    public code?: any,
    public status?: any
  ) {
    super();
    this.name = "InvalidInput";
    this.status = "error";
    (this.httpStatusCode = this.httpStatusCode || 400),
      (this.message = this.messageDetails.message);
    this.code = this.messageDetails.code;
  }
}
