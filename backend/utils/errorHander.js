export class ErrorHandler extends Error {
    constructor(message, status = 500, success = false) {
        super(message)
        this.message = message
        this.status = status
        this.success = success
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}