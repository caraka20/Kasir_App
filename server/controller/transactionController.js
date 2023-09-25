const db = require("./../models");

const {
  addToCart,
  productList,
  cart,
  cartToTransaction,
  transaction,
  createReceipt,
  totalPrice,
  getReceiptByTransactionId,
  getTransactionByIdTransaction,
  increaseQty,
  cartById,
  decreaseQty,
  cartDelete,
  transactionByIdTrans,deleteCart,
  totalPriceCart
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
      const { cartProduct, uid, kategori_name } = req.body;
      // res.send(cartProduct);
      console.log(uid);
      console.log(kategori_name);
      const transact = await transaction();

      const transaction_id = uid;

      const maps = cartProduct.map((value) => {
        return {
          product_name: value.produk.nama_produk,
          quantity: value.quantity,
          product_price: value.produk.harga,
          product_kategori: null,
          transaction_uid: transaction_id,
          user_id: value.user_id,
        };
      });

      const isConfirm = await cartToTransaction(maps);

      res.status(200).send({
        isError: false,
        message: "Transaction Created",
        data: isConfirm,
        dataTransaction: transact,
        transaction_uid: transaction_id,
      });
    } catch (error) {
      next(error);
    }
  },
  productList: async (req, res, next) => {
    try {
      const products = await db.produk.findAll({
        include: [{
          model: db.kategori_produk,
          attributes: ["nama_kategori"]
        }]
      });

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
  confirmOrder: async (req, res, next) => {
    try {
      const {
        total_price,
        customer_name,
        customer_changes,
        customer_money,
        transaction_uid,
        metode_pembayaran_id,
      } = req.body;
      console.log(customer_money);
      console.log(customer_changes);

      // if (customer_money == null) {
      // const dataToSend = {
      //   total_price: total_price,
      //   customer_name: customer_name,
      //   customer_changes: customer_changes,
      //   customer_money: Number(customer_money),
      //   transaction_uid: transaction_uid,
      //   metode_pembayaran_id: metode_pembayaran_id,
      //   payment_method: null,
      // };

      // const create = await db.receipt.create(dataToSend);

      // res.status(200).send({
      //   isError: false,
      //   message: "Transaction Success",
      //   data: create,
      // });

      // if (customer_money < total_price) {
      //   throw { message: "Money Cann't less than total price" };
      // } else {
        const dataToSend = {
          total_price: total_price,
          customer_name: customer_name,
          customer_changes: customer_changes,
          customer_money: customer_money,
          transaction_uid: transaction_uid,
          metode_pembayaran_id: metode_pembayaran_id,
          payment_method: null,
        };

        const create = await db.receipt.create(dataToSend);

        res.status(200).send({
          isError: false,
          message: "Transaction Success",
          data: create,
        });
      // }
    } catch (error) {
      next(error);
    }
  },
  total_price: async (req, res, next) => {
    try {
      const { transaction_uid } = req.body;

      const getTransaction = await totalPrice(transaction_uid);

      res.status(200).send({
        isError: false,
        message: "total price",
        data: getTransaction,
      });
    } catch (error) {
      next(error);
    }
  },
  getReceiptByIdTransaction: async (req, res, next) => {
    try {
      const { transaction_id } = req.body;

      const getReceipt = await getReceiptByTransactionId(transaction_id);

      const getTransactionByIdTransactions =
        await getTransactionByIdTransaction(transaction_id);

      console.log(getReceipt);
      res.status(200).send({
        isError: false,
        message: "data found",
        receiptByIdTransaction: getReceipt,
        transactionByIdTransaction: getTransactionByIdTransactions,
      });
    } catch (error) {
      next(error);
    }
  },
  addQuantity: async (req, res, next) => {
    try {
      const { idProduct } = req.body;
      console.log(idProduct);
      const updateCartQuantity = await increaseQty(idProduct);

      const cartt = await cart(idProduct);

      res.status(200).send({
        isError: false,
        message: "increase 1 success",
        data: updateCartQuantity,
        cart: cartt,
      });
    } catch (error) {
      next(error);
    }
  },
  decreaseQuantity: async (req, res, next) => {
    try {
      const { idProduct } = req.body;

      const cartData = await decreaseQty(idProduct);
      const data = await cartById(idProduct);

      res.status(200).send({
        isError: false,
        message: "decrease 1 success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteCartQty: async (req, res, next) => {
    try {
      const { idProduct } = req.body;

      const deleteCart = await cartDelete(idProduct);

      res.status(200).send({
        isError: false,
        message: "delete success",
      });
    } catch (error) {
      next(error);
    }
  },
  cartById: async (req, res, next) => {
    try {
      const { idProduct } = req.body;

      const cartt = await cartById(idProduct);

      res.status(200).send({
        isError: false,
        data: cartt,
      });
    } catch (error) {
      next(error);
    }
  },
  getTransactionUID: async (req, res, next) => {
    try {
      const { transaction_uid } = req.body;
      const getDataTransa = await transactionByIdTrans(transaction_uid);

      res.status(200).send({
        isError: false,
        data: getDataTransa,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteCartByUID:async (req,res,next)=> {
    try {
      const {id} = req.dataToken

      const deleteCartt = await deleteCart(id) 
      res.status(200).send({
        isError: false,
        message: "Delete Success",
        data: deleteCartt
      })
    } catch (error) {
      next(error)
    }
  },
  cartTotalPrice: async(req,res,next) => {
    try {
      // const {qty} = req.body 
      const total_price = await totalPriceCart()

      res.send(total_price)
    } catch (error) {
      return error
    }
  }
};
