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
const { authorize } = require("../../middlewares/authorize");

const router = express.Router();

router.get("/", authorize, getAll);

router.get("/:contactId", authorize, getById);

router.post("/", authorize, validate(createContactSchema), create);

router.delete("/:contactId", authorize, remove);

router.put("/:contactId", authorize, validate(updateContactSchema), update);

router.patch(
  "/:contactId/favorite",
  authorize,
  validate(updateContactStatusSchema),
  update
);

module.exports = router;
