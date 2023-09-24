const db = require("../models");
const { deleteFiles } = require("../helper/deleteFiles");

module.exports = {
    create: async (req, res, next) => {
        try {
            const data = JSON.parse(req.body.data)
            // console.log(data);

            // Validasi data tidak boleh kosong
            if(!data.nama_produk && !data.deskripsi && !data.stock && !data.harga && !data.kategori_produk_id) {
                throw {message : "Tolong... Lengkapi data"}
            }

      // Validasi Harga tidak boleh kurang dari 5000
      if (data.harga < 5000) {
        throw {
          status: 409,
          message: "Harga minimum 5000",
        };
      }

      if (data.stock < 1) {
        throw {
          status: 409,
          message: "Stock Jangan 0 woy...",
        };
      }

      // mencari column nama_produk di dalam table produk
      const product = await db.produk.findOne({
        where: { nama_produk: data.nama_produk },
      });
      // console.log(product);

      // validasi nama_produk tidak boleh sama
      // console.log(req.files.images);

      if (product) {
        throw {
          status: 409,
          message: "Produk sudah tersedia harap ganti",
        };
      }
      const dataImage = req.files.images.map((value) => {
        return { image_product: value.path };
      });
      console.log(dataImage[0].image_product);
      console.log(dataImage);

      const createProduk = await db.produk.create({
        nama_produk: data.nama_produk,
        deskripsi: data.deskripsi,
        stock: data.stock,
        harga: data.harga,
        status_product: "Active",
        image_product: dataImage[0].image_product,
      });

      // await db.produk.bulkCreate(createProduk)

      res.status(200).send({
        isError: false,
        message: "Success Membuat produk",
        data: createProduk,
      });
    } catch (error) {
      // deleteFiles(req.files)
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      //mengecek id
      const { id } = req.params;
      // mengecek isi body
      const { nama_produk, deskripsi, stock, harga, kategori_produk_id } =
        req.body;
      // console.log(id);
      // console.log(nama_produk);

      if (stock < 1) {
        throw {
          status: 409,
          message: "Jangan edit stock kurang dari 1",
        };
      }

      if (harga < 5000) {
        throw {
          status: 409,
          message: "Jangan edit harga kurang dari 5000",
        };
      }

      //ambil data produk dengan id yang sesuai dengan param
      const idProduct = await db.produk.findByPk(id);
      // console.log(idProduct);

      const updateProduk = await db.produk.update(
        {
          ...idProduct,
          nama_produk,
          deskripsi,
          stock,
          harga,
          kategori_produk_id,
        },
        {
          where: { id: id },
        }
      );
      console.log(updateProduk);

      const afterUpdateProduk = await db.produk.findByPk(id);
      console.log(afterUpdateProduk);

      res.status(200).send({
        isError: false,
        message: "Success Update",
        data: afterUpdateProduk.dataValues,
      });
    } catch (error) {
      next(error);
    }
  },

  updateImageProduk: async (req, res, next) => {
    try {
      const { idProduk } = req.params;
      console.log(idProduk);

      const images = req.files.images[0].path;
      console.log(images);

      const getData = await db.produk.findByPk(idProduk);
      console.log(getData.dataValues.image_product);
      const updateImage = await db.produk.update(
        { image_product: images },
        { where: { id: idProduk } }
      );

      await deleteFiles({
        images: [{ path: getData.dataValues.image_product }],
      });

      const getDataImage = await db.produk.findByPk(idProduk);
      res.status(200).send({
        isError: false,
        message: "success update",
        data: getDataImage,
      });
    } catch (error) {
      deleteFiles(req.files);
      console.log(error);
    }
  },

  deleteStatus: async (req, res, next) => {
    try {
      const { id } = req.params;
      // const { status_product } = req.body
      console.log(id);
      // console.log(status_product);

      const idProductStatus = await db.produk.findByPk(id);
      console.log(idProductStatus.dataValues);

      const edtiStatus = await db.produk.update(
        {
          status_product: "Non-Active",
        },
        {
          where: { id: id },
        }
      );

      const afterIdProdukStatus = await db.produk.findByPk(id);

      res.status(200).send({
        isError: false,
        message: "Status berhasil di update",
        data: afterIdProdukStatus.dataValues,
      });
    } catch (error) {
      next(error);
    }
  },

  
};
