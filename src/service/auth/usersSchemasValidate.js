const Joi = require("joi");

const createUserSchema = Joi.object({
  password: Joi.string()
    .trim()
    .min(6)
    .max(8)
    .rule({
      message:
        "password must contains only of symbols a-z, A-Z, 0-9 and exist from 6 to 8 symbols",
    })
    .required(),
  email: Joi.string().trim().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const logInUserSchema = Joi.object({
  password: Joi.string()
    .trim()
    .rule({
      message: "password must contains only of symbols a-z, A-Z, 0-9",
    })
    .required(),
  email: Joi.string().trim().required(),
});

const resendVerificationUserSchema = Joi.object({
  email: Joi.string().trim().email().required(),
});

const updateUserSubSchema = Joi.object({
  subscription: Joi.any().valid("starter", "pro", "business").required(),
});

module.exports = {
  createUserSchema,
  logInUserSchema,
  updateUserSubSchema,
  resendVerificationUserSchema,
};
