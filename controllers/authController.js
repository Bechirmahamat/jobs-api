const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const login = (req, res) => {
    res.send('Login login')
}

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    console.log(user.createTOKEN())
    res.status(201).json({
        user: { id: user._id, username: user.name, email: user.email },
        token: user.createTOKEN(),
    })
}

module.exports = {
    login,
    register,
}
