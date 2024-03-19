const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const login = (req, res) => {
    res.send('Login login')
}

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    res.status(201).json(user)
}

module.exports = {
    login,
    register,
}
