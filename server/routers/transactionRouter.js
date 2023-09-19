const express = require("express");

const Router = express.Router();

const transactionController = require("./../controller/transactionController");

Router.post("/cashier/:id", transactionController.addProductToCart);



module.exports = Router