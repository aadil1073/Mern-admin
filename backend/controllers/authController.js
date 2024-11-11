const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Login = require('../models/loginModel');

const loginController = async (req, res) => {
  const { f_userName, f_Pwd } = req.body;

  try {
    // Check if the username exists
    const user = await Login.findOne({ f_userName });
    if (!user) {
      return res.status(400).json({ message: 'Invalid login details' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(f_Pwd, user.f_Pwd);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid login details' });
    }

    // Create JWT Token
    const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      username: user.f_userName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginController };
