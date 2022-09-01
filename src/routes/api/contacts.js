const express = require("express");

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

router.post("/", create);

router.delete("/:contactId", remove);

router.put("/:contactId", update);

module.exports = router;
