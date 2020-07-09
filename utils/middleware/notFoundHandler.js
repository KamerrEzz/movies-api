const boon = require('@hapi/boom');

function notFoundHanlder(req, res){
    const {
        output:{ statusCode, payload}
    } = boon.notFound();

    res.status(statusCode).json(payload)
}

module.exports = notFoundHanlder;