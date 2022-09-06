const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactsSchema = new Schema({
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Contact = mongoose.model("contact", contactsSchema);

module.exports = { Contact };
