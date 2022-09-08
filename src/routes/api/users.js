const express = require("express");
const {
  register,
  logIn,
  current,
  logOut,
  updateSubscribe,
} = require("../../controller/controllerUsers");
const { validate } = require("../../middlewares/validate");
const { authorize } = require("../../middlewares/authorize");
const {
  createUserSchema,
  logInUserSchema,
  updateUserSubSchema,
} = require("../../service/auth/usersSchemasValidate");

const router = express.Router();

router.post("/register", validate(createUserSchema), register);

router.post("/login", validate(logInUserSchema), logIn);

router.get("/current", authorize, current);

router.post("/logout", authorize, logOut);

router.patch("/", authorize, validate(updateUserSubSchema), updateSubscribe);

module.exports = router;
