const productController = require('./productController')
const userController = require("./userController")
const kasirController = require("./kasirController")

const categoryController = require('./categoryController')
const filterController = require('./filterController')
const reportController = require("./reportController")
const authorizationController = require("./authorizationController")
const transactionController = require('./transactionController')

module.exports = {
    productController,
    userController,
    kasirController,
    categoryController,
    filterController,
    reportController,
    authorizationController,
    transactionController
}