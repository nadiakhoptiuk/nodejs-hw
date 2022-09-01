const fs = require("fs");
// const shortId = require("short-uuid");
const path = require("path");

const { Contact } = require("../db/contactsSchema");

const fsPromises = fs.promises;
const contactsPath = path.join(__dirname, "contacts.json");

async function readListOfContacts() {
  const list = await fsPromises.readFile(`${contactsPath}`, "utf-8");
  return JSON.parse(list);
}

async function writeContactsToFile(array) {
  return await fsPromises.writeFile(
    `${contactsPath}`,
    `${JSON.stringify(array)}`,
    "utf-8"
  );
}

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
    throw new Error();
  }

  return defineContact;
}

async function addContact({ name, email, phone, favorite }) {
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
