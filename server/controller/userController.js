const conn = require ("../models")

module.exports = { //udah bisa namun belum ada validasi samsek
    loginUser: async (req, res, next) => {
        try {
            const {username, password} = req.query 
            const masuk = await conn.user.findOne({where: {username: username, password: password}});
            if(!masuk) {
                res.status(401).send({
                    message:"username or password is invalid!"
                })
            } else {
                res.status(200).send({
                    isError: false,
                    message:"Welcome back, have beautiful day!",
                    data: masuk
                })
            }
            // const masuk = await conn.user.findOne()
        } catch (error) {
            console.log(error.message)
        }
    },

}
// ganbatte2023