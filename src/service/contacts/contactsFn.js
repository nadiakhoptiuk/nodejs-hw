const { Contact } = require("../../db/contactsSchema");

async function getContactsList() {
  return Contact.find();
}

async function getContactById(contactId) {
  const defineContact = await Contact.findOne({ _id: contactId });

  if (!defineContact) {
    throw new Error();
  }
  return defineContact;
}

async function deleteContactById(contactId) {
  const defineContact = Contact.findOneAndRemove({ _id: contactId });

  if (!defineContact) {
    throw new Error("Not found");
  }

  return defineContact;
}

async function addContact({ name, email, phone, favorite = false }) {
  return await Contact.create({ name, email, phone, favorite });
}

async function updateContact(contactId, body) {
  const defineContact = await Contact.findOneAndUpdate(
    { _id: contactId },
    body
  );

  if (!defineContact) {
    throw new Error();
  }

  return await Contact.findOne({ _id: contactId });
}

module.exports = {
  getContactsList,
  getContactById,
  deleteContactById,
  addContact,
  updateContact,
};
