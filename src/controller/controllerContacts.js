const Joi = require("joi");
const {
  getContactsList,
  getContactById,
  addContact,
  deleteContactById,
  updateContact,
} = require("../models/contactsFn");

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const getAll = async (req, res) => {
  try {
    const contactsList = await getContactsList();

    res.json({
      status: "success",
      code: 200,
      data: { contactsList: contactsList },
    });
  } catch (error) {
    res.status(404).json({ message: "Not found" }); //TODO
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.contactId;

    const defineContact = await getContactById(id);

    res.json({
      status: "success",
      code: 200,
      data: { contact: defineContact },
    });
  } catch (error) {
    res.status(404).json({ message: "Contact not found" }); //TODO
  }
};

const create = async (req, res) => {
  try {
    const data = createSchema.validate(req.body);

    if (data.error) {
      const errorField = data.error.details[0].context.key;

      throw new Error(`${errorField}`);
    }

    const newContact = await addContact(data.value);

    res.status(201).json({
      status: "success",
      code: 201,
      message: "New contact has been successfully created!",
      data: { contact: newContact },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: `missing required ${error.message} field` }); //TODO
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.contactId;

    await deleteContactById(id);
    res.json({
      status: "success",
      code: 200,
      message: "Contact has been successfully deleted!",
    });
  } catch (error) {
    res.status(404).json({ message: "Contact not found" }); //TODO
  }
};

const update = async (req, res) => {
  try {
    const updatedInfo = req.body;
    const id = req.params.contactId;

    const updatedContact = await updateContact(id, updatedInfo);
    res.status(200).json({
      status: "success",
      message: "Contact has been successfully updated!",
      data: { contact: updatedContact },
    });
  } catch (error) {
    res.status(404).json({ message: "Not found" }); //TODO
  }
};

const updateStatus = async (req, res) => {
  try {
    const id = req.params.contactId;

    const data = updateStatusSchema.validate(req.body);

    if (data.error) {
      res.status(400).json({
        message: "Missing field favorite",
      });
    }

    const updatedContact = await updateContact(id, data.value);

    res.status(200).json({
      status: "success",
      message: "Contact status has been successfully updated!",
      data: { contact: updatedContact },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: `missing required ${error.message} field` }); //TODO
  }
};

module.exports = { getAll, getById, create, update, updateStatus, remove };
