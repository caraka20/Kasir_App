const express = require("express")
const app = express()
const cors = require("cors")
const { productRouter } = require("./routers")
app.use(cors())
app.use(express.json())
// const {admin}
PORT = 3001


app.use('/product', productRouter)

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

