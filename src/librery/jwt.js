const jsonwebtoken = require("jsonwebtoken");
const { promisify } = require("util");

exports.jwt = {
  sign: promisify(jsonwebtoken.sign),
  verify: promisify(jsonwebtoken.verify),
};