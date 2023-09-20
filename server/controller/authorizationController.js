const conn = require ("../models")
const transporter = require ("../helper/transporter")
const handlebars = require ('handlebars')
const {hash, match} = require ('../helper/hashing')
const fs = require ('fs').promises

module.exports = {
    mailForgetPassword: async (req, res, next) => {
        try {
            const {email} = req.query
            const emailCheck = await conn.user.findOne({where:{email:email}})
            if(!emailCheck) {
                
                throw{
                    isError:true,
                    message:"Email was not found",
                    data:null
                }
            }
            const readTemplate = await fs.readFile('./public/template.html','utf-8')
            const compiledTemplate = await handlebars.compile(readTemplate)
            const newTemplate = compiledTemplate ({email})
            await transporter.sendMail({
                from: "Admin TSUGI ",
                to:"ariefrubani44@gmail.com",
                subject: "Forget Password Request",
                html: newTemplate
            })
            res.status(200).send({
                isError: false,
                message: "An email has been sent to you",
                data: null
            })
        } catch (error) {
            next(error)
        }
    },
    updatePassword: async (req, res, next) => {
        try {
            const {email} = req.query
            const {password}= req.body
            const findUser = await conn.user.findOne({where:{email: email}})
            if(!findUser) {
                return res.status(400).json({
                    isError:true,
                    message: "user not found",
                    data:null
                })
            }
            const hashedPassword = await hash(password, 10); // 10 is the number of salt rounds which is basically 
            const changePassword = await conn.user.update({password: hashedPassword}, {where:{email}})
            const updatedPassword = await conn.user.findOne({where: {email}});
            res.status(200).send({
                isError: false,
                message: "Password has been changed succesfully",
                data: updatedPassword
            })
        } catch (error) {
            next(error)
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const {id} = req.params
            const {password} = req.body
            const findUser = await conn.user.findByPk(id)

            const hashedPassword = await hash(password, 10)
            const updatedPassword = await conn.user.update({password: hashedPassword }, {where:{id}})

            if(!updatedPassword) {
                return res.status(404).json({
                    isError:true,
                    message: "User not found",
                    data: null
                });
            }

            res.status(200).json({
                isError:false,
                message:"Password have been resetted successfully",
                data:null
            });
        } catch (error) {
            next(error)
        }
    }
}