const db = require("../models")
const {sequelize} = require("../models")

module.exports = {
    createKasir : async (req, res, next) => {
        try {
            console.log("test");
        } catch (error) {
            next(error)
        }
    }
}