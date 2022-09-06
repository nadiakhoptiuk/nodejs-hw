const express = require("express");
const { register, logIn } = require("../../controller/controllerUsers");
const { validate } = require("../../middlewares/validate");
const {
  createUserSchema,
  logInUserSchema,
} = require("../../service/auth/usersSchemasValidate");

const router = express.Router();

router.post("/register", validate(createUserSchema), register);

router.post("/login", validate(logInUserSchema), logIn);

module.exports = router;
