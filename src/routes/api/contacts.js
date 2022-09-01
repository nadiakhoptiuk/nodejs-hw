const express = require("express");
const { validate } = require("../../middlewares/validate");
const {
  createSchema,
  updateSchema,
  updateStatusSchema,
} = require("../../service/schemas");
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

router.post("/", validate(createSchema), create);

router.delete("/:contactId", remove);

router.put("/:contactId", validate(updateSchema), update);

router.patch("/:contactId/favorite", validate(updateStatusSchema), update);

module.exports = router;
