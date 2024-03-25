const User = require('../Models/User')
const CustomAPIError = require('../errors/CustomAPIError')
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new CustomAPIError('PLease provide email and password', 400)
    }
    const user = await User.findOne({ email })
    // check if there is a user
    if (!user) {
        throw new CustomAPIError('User does not exit', 404)
    }
    // compare the password
    const isPasswordCorrect = await user.comparePWD(password)
    if (!isPasswordCorrect) {
        throw new CustomAPIError('Invalid Credentials', 401)
    }
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
