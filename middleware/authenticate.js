const jwt = require ('jsonwebtoken')

const authtenticate = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'rais')

        req.user = decode
        next()
    }
    catch(error){
        res.json({
            message: 'authentication failed'
        })
    }
}

module.exports = authtenticate