const express = require("express");
const Joi = require("joi");
const {
  getContactsList,
  getContactById,
  deleteContactById,
  addContact,
  updateContact,
} = require("../../models/contactsFn");

const router = express.Router();
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await getContactsList();
    res.status(200).send(contactsList);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const defineContact = await getContactById(id);

    res.status(200).send(defineContact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = schema.validate(req.body);

    if (data.error) {
      const errorField = data.error.details[0].context.key;

      throw new Error(`${errorField}`);
    }

    const newContact = await addContact(data.value);
    res.status(201).send(newContact);
  } catch (error) {
    res
      .status(400)
      .json({ message: `missing required ${error.message} field` });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;

    await deleteContactById(id);
    res.status(200).send({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const data = schema.validate(req.body);

    if (data.error) {
      const errorField = data.error.details[0].context.key;

      return res
        .status(400)
        .json({ message: `missing required ${errorField} field` });
    }

    const id = req.params.contactId;
    const updatedContact = await updateContact(id, data.value);
    res.status(200).send(updatedContact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
