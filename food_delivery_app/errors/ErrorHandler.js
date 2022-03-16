class ErrorHandler extends Error{

    constructor(status, msg) {
        this.status = status;
        this.message = msg;
    }

    static validationError(message = 'All fields are required!') {
        return new ErrorHandler(422, message);
    }

    static notFoundError(message = '404 Not Found') {
        return new ErrorHandler(404, message);
    }   
    static serverError(message = 'Internal server error') {
        return new ErrorHandler(500, message);
    }

    static forbidden(message = 'Not allowed!') {
        return new ErrorHandler(403, message);
    }

    static alreadyExist(message) {
        return new ErrorHandler(409, message);
    }

    static wrongCredentials(message = 'Username or password is wrong!') {
        return new ErrorHandler(401, message);
    }

    static unAuthorized(message = 'unAuthorized') {
        return new ErrorHandler(401, message);
    }
}

module.exports = ErrorHandler;