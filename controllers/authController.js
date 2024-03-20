const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const CustomAPIError = require('../errors/CustomAPIError')
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new CustomAPIError('PLease provide email and password', 400)
        console.log('error happened')
    }
    const user = await User.findOne({ email })
    res.status(201).json({
        user: { id: user._id, username: user.name, email: user.email },
        token: user.createTOKEN(),
    })
}

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    res.status(201).json({
        user: { id: user._id, username: user.name, email: user.email },
        token: user.createTOKEN(),
    })
}

module.exports = {
    login,
    register,
}
