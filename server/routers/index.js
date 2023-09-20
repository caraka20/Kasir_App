const userRouter = require("./userRouter")
const kasirRouter = require("./kasirRouter")
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const filterRouter = require('./filterRouter')
const reportRouter = require("./reportRouter")
const transactionRouter = require('./transactionRouter')
const authorizationRouter = require("./authorizationRouter")

module.exports = {
    productRouter,
    userRouter,
    kasirRouter,
    categoryRouter,
    filterRouter,
    authorizationRouter,
    reportRouter,
    transactionRouter
}