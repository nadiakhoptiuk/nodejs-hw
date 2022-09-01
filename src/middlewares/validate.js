function validate(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body);

    if (result.error) {
      if (result.error.details[0].context.key) {
        const errorField = result.error.details[0].context.key;

        return res
          .status(400)
          .json({ message: `missing value or error at ${errorField} field` });
      }

      return res
        .status(400)
        .json({ message: "no one field exists in the body" });
    }

    req.body = result.value;
    next();
  };
}

module.exports = {
  validate,
};
