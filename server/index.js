const express = require("express")
const app = express()
const cors = require("cors")
const { userRouter } = require("./routers")
const {kasirRouter} = require("./routers")
const {authorizationRouter} = require("./routers")
app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use("/kasir", kasirRouter)
app.use("/auth", authorizationRouter)
PORT = 3001



app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    const statusMessage = err.message || "ini error"
    return res.status(statusCode).send({
        isError : true,
        message : statusMessage,
        data : null
    })
})

app.listen(PORT, () => {
    console.log("Sedang Berjalan " + PORT);
})

