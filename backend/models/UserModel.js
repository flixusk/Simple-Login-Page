const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {  // Changed to camelCase
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: [true, 'Email already exists'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);  // Changed to singular "User"
