const { User } = require("../db/userSchema");
const {
  serializeUserResponse,
} = require("../service/auth/serializeUserResponse");
const { registerUser } = require("../service/auth/userService");

const createUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const newUser = await registerUser(req.body);

    return res.status(201).json({
      status: "success",
      userData: serializeUserResponse(newUser),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { createUser };
