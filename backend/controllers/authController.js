// controllers/authController.js

const userModel = require('../models/userModel');

exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = userModel.findUser(username, password);

  if (user) {
    res.status(200).json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid username or password.' });
  }
};