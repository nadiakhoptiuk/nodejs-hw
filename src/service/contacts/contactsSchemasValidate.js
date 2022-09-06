const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(25)
    .rule({
      message:
        "Name must contains only of symbols a-z, A-Z, 0-9 and spaces and exist from 3 to 25 symbols",
    })
    .required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9 ]+$/)
    .min(10)
    .max(13)
    .rule({
      message:
        "Phone must contains only of numbers 0-9, symbol + and exist at least 10 symbols",
    })
    .required(),
  favorite: Joi.boolean(),
});

const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9 ]+$/)
    .min(3)
    .max(25)
    .rule({
      message:
        "Name must contains only of symbols a-z, A-Z, 0-9 and spaces and exist from 3 to 25 symbols",
    }),
  email: Joi.string().trim().email(),
  phone: Joi.string()
    .trim()
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
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
};
