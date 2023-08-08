"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidInput = void 0;
class InvalidInput extends Error {
    constructor(messageDetails, httpStatusCode, code, status) {
        super();
        this.messageDetails = messageDetails;
        this.httpStatusCode = httpStatusCode;
        this.code = code;
        this.status = status;
        this.name = "InvalidInput";
        this.status = "error";
        (this.httpStatusCode = this.httpStatusCode || 400),
            (this.message = this.messageDetails.message);
        this.code = this.messageDetails.code;
    }
}
exports.InvalidInput = InvalidInput;
