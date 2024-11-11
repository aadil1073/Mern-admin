const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const loginSchema = new mongoose.Schema({
  f_userName: { type: String, required: true },
  f_Pwd: { type: String, required: true },
});

loginSchema.pre('save', async function (next) {
  if (this.isModified('f_Pwd')) {
    this.f_Pwd = await bcrypt.hash(this.f_Pwd, 10);
  }
  next();
});

const Login = mongoose.model('t_login', loginSchema);

module.exports = Login;
