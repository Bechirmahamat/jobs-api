const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/CustomAPIError')

const auth = async (req, res, next) => {
    const authorization = req.headers.authorization

    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new CustomAPIError('Unauthorize !', 401)
    }

    const token = authorization.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY)

        req.user = { userId: payload.id, name: payload.name }

        next()
    } catch (error) {
        throw new CustomAPIError('Authentication Invalid', 401)
    }
}
module.exports = auth
