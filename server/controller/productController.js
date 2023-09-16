

module.exports = {
    create: async (req, res, next) => {
        try {
            const {nama_produk, deskripsi, stock, status_product} = req.body
            console.log(nama_produk);
        } catch (error) {
            next(error)
        }
    }
}