const CustomAPIError = require('../errors/CustomAPIError')
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).send(err)
}

module.exports = errorHandlerMiddleware
