const { Contact } = require("../../db/contactsSchema");

async function getContactsList(userId) {
  return Contact.find({ owner: userId });
}

async function getContactById(contactId, userId) {
  const defineContact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  });

  if (!defineContact) {
    throw new Error();
  }
  return defineContact;
}

async function addContact({ name, email, phone, favorite = false }, userId) {
  return await Contact.create({ name, email, phone, favorite, owner: userId });
}
async function deleteContactById(contactId, userId) {
  const defineContact = Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });

  if (!defineContact) {
    throw new Error("Not found");
  }

  return defineContact;
}

async function updateContact(contactId, body, userId) {
  const defineContact = await Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body, owner: userId },
    {
      new: true,
    }
  );

  if (!defineContact) {
    throw new Error();
  }

  return defineContact;
}

module.exports = {
  getContactsList,
  getContactById,
  deleteContactById,
  addContact,
  updateContact,
};
