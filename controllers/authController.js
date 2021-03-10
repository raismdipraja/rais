const User = require('../models/User')
const jwt    = require('jsonwebtoken')

const login = (req,res,next) => {
    // const userName = req.body.userName,
    const emailAddress = req.body.emailAddress

    User.findOne({emailAddress})
    .then(user => {
        if(user) {
            const token = jwt.sign({
                emailAddress: emailAddress
                }, 'rais')
            res.json({
                message: 'Login Berhasil',
                token 
            })
        }else {
            res.json({
                message: 'Email tidak sama'
            })
        }
    })
}

module.exports = {
    login
}