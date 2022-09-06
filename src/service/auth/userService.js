const { User } = require("../../db/userSchema");

async function registerUser({ password, email }) {
  // const existingUser = await User.findOne({ email });

  // if (existingUser) {
  //   // throw new Error({ code: 409, message: "Email in use" });
  //   return res
  //     .status(409)
  //     .json({ status: "conflict", message: "Email in use" });
  // }

  const newUser = await User.create({ password, email });
  return newUser;
}

module.exports = { registerUser };
