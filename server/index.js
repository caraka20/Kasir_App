const express = require("express")
const app = express()
const cors = require("cors")
const { userRouter } = require("./routers")
app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
// app.use("/user", userRouter)
PORT = 3001

app.listen(PORT, () => {
    console.log("Sedang Berjalan " + PORT);
})

