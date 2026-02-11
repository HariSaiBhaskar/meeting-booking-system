const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: "User not found" });

  const token = jwt.sign(
    { id: user.id, email: user.email },   // 🔥 ID INCLUDED
    "secretkey123",
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
}

module.exports = { login };
