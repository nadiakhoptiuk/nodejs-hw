const express = require("express");
const { validate } = require("../../middlewares/validate");
const {
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} = require("../../service/contacts/contactsSchemasValidate");
const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require("../../controller/controllerContacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validate(createContactSchema), create);

router.delete("/:contactId", remove);

router.put("/:contactId", validate(updateContactSchema), update);

router.patch(
  "/:contactId/favorite",
  validate(updateContactStatusSchema),
  update
);

module.exports = router;
