const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())
PORT = 3001

const {kasirRouter} = require("./routers")
const {reportRouter} = require("./routers")
app.use("/kasir", kasirRouter)
app.use("/report", reportRouter)

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

