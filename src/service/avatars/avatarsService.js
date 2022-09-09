const multer = require("multer");
const { extname } = require("path");
const uuid = require("short-uuid");

const storage = multer.diskStorage({
  destination: "public/avatars",
  filename: function (req, file, cb) {
    const ext = extname(file.originalname);
    return cb(null, uuid.generate() + ext);
  },
});

const upload = multer({ storage });

module.exports = { upload };
