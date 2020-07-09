const { config } = require('../../config/index');
const boom = require('@hapi/boom');

function withErrorStack(error, stack) {
    if (config.dev) {
        return { ...error, stack }
    }

    return error;
}

function wrapErros(err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err))
    }
    next(err)
}

function logErros(err, req, res, next) {
    console.log(err);
    next(err)

}

function errorHandler(err, req, res, next) {
    const { output: { statusCode, payload } } = err;
    res.status(statusCode);
    res.json(withErrorStack(payload, err.stack))
}

module.exports = {
    logErros,
    errorHandler,
    wrapErros
}