const {
  serializeUserResponse,
  serializeUserSignIn,
} = require("../service/auth/serializeUserResponse");
const {
  createUser,
  logInUser,
  logOutUser,
  updateSubUser,
  updateUserAvatar,
  verificateUser,
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

const verificate = async (req, res, next) => {
  try {
    const verificationToken = req.params.verificationToken;
    console.log(verificationToken);

    await verificateUser(verificationToken);

    return res.status(200).json({
      status: "success",
      message: "Verification successful",
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

const current = async (req, res) => {
  return res.status(200).json({
    status: "success",
    userData: serializeUserResponse(req.user),
  });
};

const logOut = async (req, res, next) => {
  try {
    await logOutUser(req.user.id);

    return res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateSubscribe = async (req, res, next) => {
  try {
    const updatedUser = await updateSubUser(req.user.id, req.body);

    return res.status(200).json({
      status: "success",
      message: "User subscribe has been successfully updated!",
      data: { user: updatedUser },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const updatedUser = await updateUserAvatar(req.user.id, req.file);

    return res.status(200).json({
      status: "success",
      message: "User avatar has been successfully updated!",
      data: { user: updatedUser },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  register,
  verificate,
  logIn,
  current,
  logOut,
  updateSubscribe,
  updateAvatar,
};
