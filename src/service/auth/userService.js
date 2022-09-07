const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../../db/userSchema");
const { Conflict, NotFound, Forbidden, Unauthorized } = require("http-errors");

dotenv.config();
const saltRounds = 10;
const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

async function createUser({ password, email }) {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Conflict("Email in use");
  }

  const newUser = await User.create({
    password: await passwordHash(password),
    email,
  });

  return newUser;
}

async function logInUser({ password, email }) {
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new NotFound("User with such email does not exists");
  }

  const isPasswordCorrect = await checkPassword(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    throw new Forbidden("Password is wrong");
  }

  const token = await generateToken(existingUser);

  return await User.findOneAndUpdate(
    { email },
    { token: token },
    {
      new: true,
    }
  );
}

async function logOutUser(userId) {
  const existedUser = await User.findOneAndUpdate(
    { _id: userId },
    { token: null },
    { new: true }
  );

  if (!existedUser) {
    throw new Unauthorized("Not authorized");
  }

  return existedUser;
}

async function updateSubUser(userId, body) {
  const existedUser = await User.findOneAndUpdate({ _id: userId }, body, {
    new: true,
  });

  if (!existedUser) {
    throw new Unauthorized("Not authorized");
  }

  return existedUser;
}

async function passwordHash(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

async function checkPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

async function generateToken(user) {
  return jwt.sign({ sub: user._id }, secret, {
    expiresIn: expiresIn || "1d",
  });
}

module.exports = { createUser, logInUser, logOutUser, updateSubUser };
