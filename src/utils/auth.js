const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    "secretkey",
    { expiresIn: "1d" }
  );
};

module.exports = generateToken;
