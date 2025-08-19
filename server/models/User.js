const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  portfolio: [{ symbol: String, quantity: Number }],
});

module.exports = mongoose.model('User', userSchema);