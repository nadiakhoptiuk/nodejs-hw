const express = require("express");
const {
  register,
  logIn,
  current,
  logOut,
  updateSubscribe,
  updateAvatar,
  verificate,
} = require("../../controller/controllerUsers");
const { validate } = require("../../middlewares/validate");
const { authorize } = require("../../middlewares/authorize");
const {
  createUserSchema,
  logInUserSchema,
  updateUserSubSchema,
} = require("../../service/auth/usersSchemasValidate");
const { upload } = require("../../service/avatars/avatarsService");

const router = express.Router();

router.post("/register", validate(createUserSchema), register);

router.get("/verify/:verificationToken", verificate);

router.post("/login", validate(logInUserSchema), logIn);

router.get("/current", authorize, current);

router.post("/logout", authorize, logOut);

router.patch("/", authorize, validate(updateUserSubSchema), updateSubscribe);

router.patch("/avatars", authorize, upload.single("avatar"), updateAvatar);

module.exports = router;
