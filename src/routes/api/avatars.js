const express = require("express");

const router = express.Router();

router.use("/", express.static("public/avatars"));

module.exports = router;
