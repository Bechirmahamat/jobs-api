const CustomAPIError = require('../errors/CustomAPIError')
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || 500,
        message: err.message || 'Something went Wrong try again later',
    }

    if (err.code && err.code === 11000) {
        customError.message = `Email already token. Please try with another email`
        customError.statusCode = 400
    }
    if (err.name === 'ValidationError') {
        customError.message = Object.values(err.errors)
            .map((item) => item.message)
            .join('. ')
        customError.statusCode = 400
    }
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    if (err.name === 'CastError') {
        customError.message = `No item found with id: ${err.value}`
        customError.statusCode = 404
    }
    return res.status(customError.statusCode).json({ msg: customError.message })
}

module.exports = errorHandlerMiddleware
