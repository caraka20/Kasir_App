const express = require('express');
const Route = express.Router();
const {userController} = require("./../controller")
const upload = require("../middleware/upload")
const {verify} = require("../lib/jwt")

Route.get("/login", userController.loginUser)
Route.post("/map",verify, userController.getAllData)
Route.patch("/updateimage",upload, userController.updateImagecashier)
module.exports = Route