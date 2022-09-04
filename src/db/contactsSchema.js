const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contacts = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    unique: [true, "Contact with this name already exists in the database"],
  },
  email: {
    type: String,
    unique: [true, "Contact with this email already exists in the database"],
  },
  phone: String,
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("contact", contacts);

module.exports = { Contact };
