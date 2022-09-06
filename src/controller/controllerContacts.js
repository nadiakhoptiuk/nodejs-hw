const { Contact } = require("../db/contactsSchema");
const {
  getContactsList,
  getContactById,
  addContact,
  deleteContactById,
  updateContact,
} = require("../service/contacts/contactsFn");

const getAll = async (req, res, next) => {
  try {
    const contactsList = await getContactsList();

    return res.json({
      status: "success",
      code: 200,
      data: { contactsList: contactsList },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const defineContact = await getContactById(id);

    return res.json({
      status: "success",
      code: 200,
      data: { contact: defineContact },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const existingContactWithSameEmail = await Contact.findOne({
      email: req.body.email,
    });

    if (existingContactWithSameEmail) {
      return res.status(404).json({
        message: "User with such email already exists",
      });
    }

    const newContact = await addContact(req.body);

    return res.status(201).json({
      message: "New contact has been successfully created!",
      data: { contact: newContact },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    await deleteContactById(id);
    return res.json({
      status: "success",
      code: 200,
      message: "Contact has been successfully deleted!",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const updatedContact = await updateContact(id, req.body);

    return res.status(200).json({
      status: "success",
      message: "Contact has been successfully updated!",
      data: { contact: updatedContact },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
