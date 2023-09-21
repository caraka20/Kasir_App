const db = require("./../models");

const {
  addToCart,
  productList,
  cart,
  cartToTransaction,
  transaction
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



      console.log(filtered);

      if (filtered.length > 0) {
        throw {
          message: "Product is already exist in the cart",
          isError: true,
        };  
      } else {
        const productAddToCart = await addToCart({
          price: product.dataValues.harga,
          produk_id: product.id,
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
      const { customer, cartProduct } = req.body;
      // res.send(cartProduct);



      const transact = await transaction()

      const transaction_id = getRandomCode();


      const maps = cartProduct.map((value) => {
        return {
          product_name: value.produk.nama_produk,
          quantity: value.quantity,
          product_price: value.produk.harga,
          customer_name: customer,
          transaction_uid: transaction_id,
          user_id: value.user_id,
        };
      });

      const isConfirm = await cartToTransaction(maps);

      res.status(200).send({
        isError: false,
        message: "Transaction Created",
        data: isConfirm,
        dataTransaction: transact
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
