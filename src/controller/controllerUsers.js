const {
  serializeUserResponse,
} = require("../service/auth/serializeUserResponse");
const { registerUser } = require("../service/auth/userService");

const createUser = async (req, res, next) => {
  try {
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
