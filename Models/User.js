const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Must provide a name'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Must provide a password'],
        minlength: 5,
        maxlength: 50,
    },
})

module.exports = mongoose.model('Users', UserModel)
