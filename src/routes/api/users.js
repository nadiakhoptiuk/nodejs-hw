const express = require("express");
const {
  register,
  logIn,
  current,
} = require("../../controller/controllerUsers");
const { validate } = require("../../middlewares/validate");
const { authorize } = require("../../middlewares/authorize");
const {
  createUserSchema,
  logInUserSchema,
} = require("../../service/auth/usersSchemasValidate");

const router = express.Router();

router.post("/register", validate(createUserSchema), register);

router.post("/login", validate(logInUserSchema), logIn);

router.get("/current", authorize, current);

module.exports = router;
