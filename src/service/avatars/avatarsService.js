const multer = require("multer");

const storage = multer.diskStorage({
  destination: "tmp",
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = { upload };
