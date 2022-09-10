const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const gravatar = require("gravatar");
const path = require("path");
const Jimp = require("Jimp");
const { User } = require("../../db/userSchema");
const { Conflict, NotFound, Forbidden, Unauthorized } = require("http-errors");

dotenv.config();
const saltRounds = 10;
const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;
const avatarsPath = path.resolve("./public/avatars");

async function createUser({ password, email }) {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Conflict("Email in use");
  }

  const avatarURL = gravatar.url(email, { protocol: "https", d: "identicon" });

  const newUser = await User.create({
    password: await passwordHash(password),
    email,
    avatarURL,
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

async function updateUserAvatar(userId, file) {
  const ext = file.originalname.split(".").reverse()[0];
  const date = new Date().getTime();

  const newFileName = `${userId}-${date}-small.${ext}`;

  Jimp.read(file.path)
    .then((avatar) => {
      return avatar.resize(250, 250).write(`${avatarsPath}/${newFileName}`);
    })
    .catch((err) => {
      console.error(err);
    });

  await fs.unlink(file.path, (err) => {
    if (err) console.log(err.message);
  });

  const existedUser = await User.findOneAndUpdate(
    { _id: userId },
    { avatarURL: `/avatars/${newFileName}` },
    {
      new: true,
    }
  );

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

module.exports = {
  createUser,
  logInUser,
  logOutUser,
  updateSubUser,
  updateUserAvatar,
};
