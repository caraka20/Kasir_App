const express = require("express");

const Router = express.Router();
const {verify} = require('./../lib/jwt')
const transactionController = require("./../controller/transactionController");

Router.post("/cashier", verify,  transactionController.addProductToCart);


Router.post("/transaction", transactionController.confirm);


Router.get("/products", transactionController.productList);


Router.get("/cart", transactionController.cart);





module.exports = Router