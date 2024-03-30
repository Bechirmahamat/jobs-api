require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide a valid email',
            ],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 5,
        },
    },
    { timestamps: true }
)

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// set up token properly in method

UserSchema.methods.createTOKEN = function () {
    return jwt.sign(
        { id: this._id, name: this.name },
        process.env.JWT_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.JWT_LIFE_TIME,
        }
    )
}
UserSchema.methods.comparePWD = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}

module.exports = mongoose.model('Users', UserSchema)
