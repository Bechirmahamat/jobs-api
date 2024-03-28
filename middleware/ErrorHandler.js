const CustomAPIError = require('../errors/CustomAPIError')
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || 500,
        message: err.message || 'Something went Wrong try again later',
    }

    if (err.code && err.code === 11000) {
        customError.message = `Email already exist.Please try with another account`
        customError.statusCode = 400
    }
    if (err.name === 'ValidationError') {
        customError.statusCode = 400
    }
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(customError.statusCode).json({ msg: customError.message })
}

module.exports = errorHandlerMiddleware
