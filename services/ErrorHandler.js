class ErrorHandler extends Error{

    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
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

    static notFound(message = '404 Not Found') {
        return new ErrorHandler(404, message);
    }

    static serverError(message = 'Internal server error') {
        return new ErrorHandler(500, message);
    }
}

module.exports = ErrorHandler;