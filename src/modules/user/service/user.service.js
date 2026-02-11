const bcrypt = require("bcryptjs");
const User = require("../model/user.model");

async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword
  });
}

async function getUserById(id) {
  return await User.findByPk(id);
}

async function getAllUsers() {
  return await User.findAll();
}

module.exports = { createUser, getUserById, getAllUsers };
