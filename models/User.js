const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    accountNumber:{
        type: Number,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    identityNumber:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)