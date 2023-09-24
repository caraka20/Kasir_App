const { check, validationResult } = require('express-validator');

module.exports = {
    checkData: async(req, res, next) => {
        try {
            await check("username").notEmpty().isAlphanumeric().withMessage('Username Must be filled!').run(req);

            const valRes = validationResult(req)
            if(valRes.isEmpty()) return next()

            res.status(500).send({
                isError: true, 
                message: valRes.errors[0].msg || valRes.errors[1].msg, 
                data: null
            })
        } catch (error) {
            next(error)
        }
    }
}