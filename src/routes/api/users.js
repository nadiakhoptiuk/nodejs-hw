const express = require("express");
const { createUser } = require("../../controller/controllerUsers");
const { validate } = require("../../middlewares/validate");
const { createUserSchema } = require("../../service/auth/usersSchemasValidate");

const router = express.Router();

router.post("/register", validate(createUserSchema), createUser);

// router.post("/register", validate(createUserSchema), createUser);

module.exports = router;
