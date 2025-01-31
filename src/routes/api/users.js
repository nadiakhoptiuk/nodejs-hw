const express = require("express");
const {
  register,
  logIn,
  current,
  logOut,
  updateSubscribe,
  updateAvatar,
  verificate,
  resendVerificationEmail,
} = require("../../controller/controllerUsers");
const { validate } = require("../../middlewares/validate");
const { authorize } = require("../../middlewares/authorize");
const {
  createUserSchema,
  logInUserSchema,
  updateUserSubSchema,
  resendVerificationUserSchema,
} = require("../../service/auth/usersSchemasValidate");
const { upload } = require("../../service/avatars/avatarsService");

const router = express.Router();

router.post("/register", validate(createUserSchema), register);

router.get("/verify/:verificationToken", verificate);

router.post(
  "/verify",
  validate(resendVerificationUserSchema),
  resendVerificationEmail
);

router.post("/login", validate(logInUserSchema), logIn);

router.get("/current", authorize, current);

router.post("/logout", authorize, logOut);

router.patch("/", authorize, validate(updateUserSubSchema), updateSubscribe);

router.patch("/avatars", authorize, upload.single("avatar"), updateAvatar);

module.exports = router;
