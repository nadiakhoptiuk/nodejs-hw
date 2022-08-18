const fs = require("fs");
const shortId = require("short-uuid");
const path = require("path");

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
  const list = await readListOfContacts();
  return list;
}

async function getContactById(contactId) {
  const list = await readListOfContacts();

  const defineContact = list.find(({ id }) => id === contactId);

  if (!defineContact) {
    throw new Error();
  }
  return defineContact;
}

async function deleteContactById(contactId) {
  const list = await readListOfContacts();
  const defineContact = list.find((contact) => contact.id === contactId);

  if (!defineContact) {
    throw new Error();
  }

  const newListCreated = list.filter(({ id }) => id !== contactId);

  await writeContactsToFile(newListCreated);
  return defineContact;
}

async function addContact({ name, email, phone }) {
  const list = await readListOfContacts();
  const id = shortId.generate();

  const newContact = { id, name, email, phone };
  const newListCreated = [...list, newContact];

  await writeContactsToFile(newListCreated);
  return newContact;
}

async function updateContact(contactId, body) {
  const { name, email, phone } = body;
  const list = await readListOfContacts();

  const defineContact = list.find(({ id }) => id === contactId);

  if (!defineContact) {
    throw new Error();
  }

  const updatedContact = { id: contactId, name, email, phone };
  const listWithOtherContacts = list.filter(({ id }) => id !== contactId);

  const newList = [...listWithOtherContacts, updatedContact];
  writeContactsToFile(newList);
  return updatedContact;
}

module.exports = {
  getContactsList,
  getContactById,
  deleteContactById,
  addContact,
  updateContact,
};
