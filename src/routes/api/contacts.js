const express = require("express");

const {
  getAll,
  getById,
  create,
  remove,
  update,
  updateStatus,
} = require("../../controller/controllerContacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", create);

router.delete("/:contactId", remove);

router.put("/:contactId", update);

router.patch("/:contactId/favorite", updateStatus);

module.exports = router;
