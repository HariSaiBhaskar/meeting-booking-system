const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

let users = []; // TEMP storage

router.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  const id = users.length + 1;

  users.push({ id, name, email, password });

  res.status(201).json({
    message: "User registered successfully",
    user: { id, name, email }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    "secretkey123",
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});

module.exports = router;
