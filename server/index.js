//all const and importants are heere
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

PORT = 3001

app.use(express.json())

const { productRouter } = require("./routers")
const { userRouter } = require("./routers")
const { categoryRouter } = require('./routers')
const { kasirRouter } = require("./routers")
const { filterRouter } = require('./routers')



app.use(express.json())
app.use("/user",userRouter)
app.use("/kasir", kasirRouter)


// console.log(productRouter);
app.use('/filter', filterRouter)
app.use('/product', productRouter)
// app.use('/category', categoryRouter)
// app.use("/kasir", kasirRouter)

const {authorizationRouter} = require("./routers")
const {transactionRouter} = require('./routers')
const {reportRouter} = require("./routers")

//All app.use are here
app.use("/user",userRouter)
app.use("/kasir", kasirRouter)
app.use("/report", reportRouter)
app.use("/auth", authorizationRouter)
app.use("/transaction", transactionRouter)
app.use('/filter', filterRouter)
app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use("/kasir", kasirRouter)

PORT = 3001


app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    const statusMessage = err.message || "Error"
    return res.status(statusCode).send({
        isError: true,
        message: statusMessage,
        data: null
    })
})



app.listen(PORT, () => {
    console.log("Sedang Berjalan " + PORT);
})

