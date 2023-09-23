const { multerupload } = require("./../lib/multer");

const { deleteFiles } = require("./../helper/deleteFiles");

const upload = async (req, res, next) => {
  const result = multerupload.fields([{ name: "images", maxCount: 3 }]);
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  result(req, res, function (err) {
    try {
      if (err) throw err;

      console.log(req.files);
      req.files.images.forEach((values) => {
        if (values.size > 1000000)
          throw {
            message: `${values.originalname} is Too Large!`,
            files: req.files,
          };
      });
      next()
    } catch (error) {
      deleteFiles(error.files);
      next(error);
    }
  });
};

module.exports = upload;
