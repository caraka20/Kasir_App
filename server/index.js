const express = require("express")
const app = express()
const cors = require("cors")

const { productRouter } = require("./routers")
const { userRouter } = require("./routers")
const { categoryRouter } = require('./routers')
const { kasirRouter } = require("./routers")
const { filterRouter } = require('./routers')
const {kasirRouter} = require("./routers")

const {authorizationRouter} = require("./routers")
const {transactionRouter} = require('./routers')
app.use(cors())
app.use(express.json())


const {kasirRouter} = require("./routers")
const {reportRouter} = require("./routers")

app.use("/user",userRouter)

app.use("/kasir", kasirRouter)
app.use("/report", reportRouter)

app.use("/auth", authorizationRouter)

app.use("/transaction", transactionRouter)

PORT = 3001

// console.log(filterRouter);
app.use('/filter', filterRouter)
app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use("/kasir", kasirRouter)


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

