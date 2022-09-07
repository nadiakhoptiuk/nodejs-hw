const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const secret = process.env.JWT_SECRET;

function authorize(req, res, next) {
  const authHeader = req.headers.authorization || "";

  const token = authHeader.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (error) {
    throw new Unauthorized();
  }

  req.userId = payload.sub;
  next();
}

module.exports = { authorize };
