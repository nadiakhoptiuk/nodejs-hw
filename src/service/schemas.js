const Joi = require("joi");

const createSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(25).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[+]?[0-9]+$/)
    .min(10)
    .max(13)
    .rule({
      message:
        "Phone must contains only of numbers 0-9 and exist at least 10 symbols",
    })
    .required(),
  favorite: Joi.boolean(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(25),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^[+]?[0-9]+$/)
    .min(10)
    .max(13)
    .rule({
      message:
        "Phone must contains only of numbers 0-9 and exist at least 10 symbols",
    }),
  favorite: Joi.boolean(),
}).min(1);

module.exports = {
  createSchema,
  updateSchema,
  updateStatusSchema,
};
