const {
  serializeUserResponse,
  serializeUserSignIn,
  serializeCurrentUser,
} = require("../service/auth/serializeUserResponse");
const {
  createUser,
  logInUser,
  getCurrentUser,
} = require("../service/auth/userService");

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
    const user = await logInUser(req.body);

    return res.status(200).json({
      status: "success",
      userData: serializeUserSignIn(user),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.userId);

    return res.status(200).json({
      status: "success",
      userData: serializeCurrentUser(user),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logOut = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.userId);

    return res.status(200).json({
      status: "success",
      userData: serializeCurrentUser(user),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { register, logIn, current, logOut };
