const db = require("./../models");
const { sequelize } = require("./../models");

module.exports = {
  addToCart: async (data) => {
    try {
      console.log(">>>", data);
      const addProduct = await db.cart.create(data);

      return addProduct;
    } catch (error) {
      return error;
    }
  },
  productList: async (id) => {
    console.log(id);
    try {
      const products = await db.produk.findOne({ where: { id: id } });

      return products;
    } catch (error) {
      return error;
    }
  },
  cart: async () => {
    try {
      const cartProducts = await db.cart.findAll({
        include: [
          {
            model: db.produk,
            attributes: ["nama_produk", "harga", "stock", "deskripsi"],
            include: [
              {
                model: db.kategori_produk,
                attributes: ["nama_kategori"],
              },
            ],
          },
        ],
      });

      return cartProducts;
    } catch (error) {
      return error;
    }
  },
  cartToTransaction: async (data) => {
    try {
      const sendCart = await db.transaction.bulkCreate(data);

      return sendCart;
    } catch (error) {
      return error;
    }
  },
  transaction: async (data) => {
    try {
      const transaction = await db.transaction.findAll({
        include: [
          {
            model: db.metode_pembayaran,
            attributes: ["pembayaran", "tujuan_pembayaran"],
          },
        ],
      });

      return transaction;
    } catch (error) {
      return error;
    }
  },
  createReceipt: async (data) => {
    try {
      const createReceipt = await db.receipt.create(dataToSend);

      return createReceipt;
    } catch (error) {
      return error;
    }
  },
  totalPrice: async (data) => {
    try {
      const totalPrice = await db.transaction.findAll({
        attributes: [
          [sequelize.fn("SUM", sequelize.col("product_price")), "total_price"],
        ],
        where: { transaction_uid: data },
      });
      return totalPrice;
    } catch (error) {
      return error;
    }
  },
  getReceiptByTransactionId: async (data) => {
    try {
      const getReceipt = await db.receipt.findOne({
        include: [
          {
            model: db.metode_pembayaran,
            attributes: ["pembayaran"],
          },
        ],
        where: { transaction_uid: data },
      });
      return getReceipt;
    } catch (error) {
      return error;
    }
  },
  getTransactionByIdTransaction: async (data) => {
    try {
      const getTransaction = await db.transaction.findAll({
        where: { transaction_uid: data },
      });

      return getTransaction;
    } catch (error) {
      return error;
    }
  },
  increaseQty: async (data) => {
    console.log(data);
    try {
      const getCartById = await db.cart.update(
        { quantity: sequelize.literal("quantity + 1") },
        { where: { id: data } }
      );

      return getCartById;
    } catch (error) {
      return error;
    }
  },
  cartById: async (data) => {
    try {
      const cartById = await db.cart.findByPk(data);
      return cartById;
    } catch (error) {
      return error;
    }
  },
  decreaseQty: async (data) => {
    try {
      const getCartById = await db.cart.update(
        { quantity: sequelize.literal("quantity - 1") },
        { where: { id: data } }
      );

      return getCartById;
    } catch (error) {
      return error;
    }
  },
  cartDelete: async (data) => {
    try {
      const deleteCart = await db.cart.destroy({ where: { id: data } });
      return deleteCart;
    } catch (error) {
      return error;
    }
  },
};
