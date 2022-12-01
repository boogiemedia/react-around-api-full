const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var validator = require('validator');
const REGEX_URL = require('../constants/regex');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'use valid url',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator: (v) => REGEX_URL.test(v),
      message: 'use valid url',
      default: 'https://pbs.twimg.com/media/E7OrdQCXsAAJARl.jpg',
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {};

module.exports = mongoose.model('user', userSchema);
