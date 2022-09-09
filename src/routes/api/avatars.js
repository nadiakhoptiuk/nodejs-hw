const express = require("express");
const { upload } = require("../../service/avatars/avatarsService");

const router = express.Router();

router.post("/upload", upload.single("avatar"), async (req, res, next) => {
  res.send({ status: "success" });
});

router.use("/", express.static("public/avatars"));

module.exports = router;
