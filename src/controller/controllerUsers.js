const {
  serializeUserResponse,
  serializeUserSignIn,
} = require("../service/auth/serializeUserResponse");
const { createUser, logInUser } = require("../service/auth/userService");

const register = async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);

    return res.status(201).json({
      status: "success",
      userData: serializeUserResponse(newUser),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { existingUser, token } = await logInUser(req.body);

    return res.status(200).json({
      status: "success",
      userData: serializeUserSignIn(existingUser, token),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { register, logIn };
