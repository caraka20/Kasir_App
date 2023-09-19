const express = require('express');
const Route = express.Router();
const {userController} = require("./../controller")
const upload = require("../middleware/upload")

Route.get("/login", userController.loginUser)
Route.patch("/updateimage",upload, userController.updateImagecashier)
module.exports = Route