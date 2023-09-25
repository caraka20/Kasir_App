const jwt = require('jsonwebtoken')

module.exports = {
    createJWT: (payload) => {
        try {
            return jwt.sign(payload, 'abc123', {
                expiresIn: '24h'
            })
        } catch (error) {
            return error
        }
    },
    verify: (req, res, next) => {
        try {
            const {authorization} = req.headers
            console.log(authorization);
            
            const decodeData = jwt.verify(authorization, 'abc123')
            console.log(decodeData);
            req.dataToken = decodeData
            next()
        } catch (error) {
            console.log(error);
        }
    }
}