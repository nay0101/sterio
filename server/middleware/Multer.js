const multer = require("multer");
const BASE_STORAGE = "public";

const filmStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "source") {
      cb(null, `${BASE_STORAGE}/videos`);
    }
    if (file.fieldname === "thumbnail") {
      cb(null, `${BASE_STORAGE}/thumbnails`);
    }
    if (file.fieldname === "poster") {
      cb(null, `${BASE_STORAGE}/posters`);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const filmUpload = multer({ storage: filmStorage });

module.exports = { filmUpload };
