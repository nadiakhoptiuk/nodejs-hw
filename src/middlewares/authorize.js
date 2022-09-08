const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../db/userSchema");

dotenv.config();
const secret = process.env.JWT_SECRET;

async function authorize(req, res, next) {
  const authHeader = req.headers.authorization || "";

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, secret);

    const existingUser = await User.findOne({
      _id: payload.sub,
      token: token,
    });
    if (!existingUser) {
      throw new Unauthorized();
    }

    req.user = existingUser;
  } catch (error) {
    return next(new Unauthorized("Unauthorized"));
  }
  next();
}

module.exports = { authorize };
