const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/CustomAPIError')

const auth = (req, res) => {
    const authorization = req.header.authorization
    if (!authorization || !authorization.startWith('Bearer')) {
        throw new CustomAPIError('Unauthorize !', 401)
    }
    const token = authorization.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY)
        req.user = { userId: payload.userId, name: payload.name }
    } catch (error) {
        throw new CustomAPIError('Authentication Invalid')
    }
}
