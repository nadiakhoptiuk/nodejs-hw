const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../../db/userSchema");
const { Conflict, NotFound, Forbidden } = require("http-errors");

dotenv.config();
const saltRounds = 10;

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

  const existingUserPasswordHash = await passwordHash(password);

  const isPasswordCorrect = await checkPassword(
    password,
    existingUserPasswordHash
  );

  if (!isPasswordCorrect) {
    throw new Forbidden("Password is wrong");
  }

  const token = await generateToken(existingUser);

  return { existingUser, token };
}

async function passwordHash(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

async function checkPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

async function generateToken(user) {
  return jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
}

module.exports = { createUser, logInUser };
