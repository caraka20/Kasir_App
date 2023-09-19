const express = require("express")
const app = express()
const cors = require("cors")

const { productRouter } = require("./routers")

const { userRouter } = require("./routers")
const { categoryRouter } = require('./routers')
app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
PORT = 3001



app.use('/product', productRouter)
app.use('/category', categoryRouter)


const {kasirRouter} = require("./routers")
const { categoryController } = require("./controller")
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

