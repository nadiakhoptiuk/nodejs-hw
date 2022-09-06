const { User } = require("../../db/userSchema");
const { Conflict } = require("http-errors");

async function registerUser({ password, email }) {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Conflict("Email in use");
  }

  return await User.create({ password, email });
}

module.exports = { registerUser };
