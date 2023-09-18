const express = require('express');
const Route = express.Router();
const {userController} = require("./../controller")

Route.get("/login", userController.loginUser)

module.exports = Route