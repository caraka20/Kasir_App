const db = require("./../models");

const {
  addToCart,
  productList,
  cart,
  cartToTransaction,
} = require("./../services/transactionService");

module.exports = {
  addProductToCart: async (req, res, next) => {
    try {
      const { idProduct } = req.body;
      const { id } = req.dataToken;

      const product = await productList(idProduct);

      const cartss = await cart();

      const filtered = cartss.filter((value) => {
        return value.dataValues.produk_id == product.dataValues.id;
      });

      if (filtered.length > 0) {
        throw { message: "Product has already exist on cart", isError: true };
      } else {
        const productAddToCart = await addToCart({
          product_name: product.dataValues.nama_produk,
          price: product.dataValues.harga,
          produk_id: idProduct,
          user_id: id,
          quantity: 1,
        });

        res.status(200).send({
          isError: false,
          message: "Added to Cart Success",
          data: productAddToCart,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  confirm: async (req, res, next) => {
    function getRandomCode() {
      let result = "";
      for (let i = 0; i < 6; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        result += randomDigit;
      }
      return result;
    }
    try {
      const { customer, metode_pembayaran } = req.body;
      const listCart = await cart();
      // let dataToSend = {};

      const transaction_id = getRandomCode();
      const map = listCart.map((value) => {
        return {
          product_name: value.dataValues.product_name,
          quantity: value.dataValues.quantity,
          product_price: value.dataValues.price,
          customer_name: customer,
          transaction_uid: transaction_id,
          metode_pembayaran: metode_pembayaran,
          user_id: value.dataValues.user_id,
        };
      });

      const isConfirm = await cartToTransaction(map);

      res.status(200).send({
        isError: false,
        message: "Transaction Created",
        data: isConfirm,
      });
    } catch (error) {
      next(error);
    }
  },
  productList: async (req, res, next) => {
    try {
      const products = await db.produk.findAll();

      res.status(200).send({
        isError: false,
        message: "Products Found",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },
  cart: async (req, res, next) => {
    try {
      const getCart = await cart();

      res.status(200).send({
        isError: false,
        message: "Cart Found",
        data: getCart,
      });
    } catch (error) {
      next(error);
    }
  },
};
