const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();
const {
  OK,
  ADD,
  INVALID_DATA,
  SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
  USER_ALREDY_EXIST,
} = require('../constants/statusHandler');

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.status(OK).send({ token });
    })
    .catch((err) => {
      if (err.status === INVALID_DATA) {
        res.status(INVALID_DATA).send({ message: err.message });
      }
      res.status(401).send({ message: err.message });
    });
};

const createUsers = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const { password, email } = req.body;
  bcrypt
    .hash(password, salt)
    .then((hash) => {
      User.create({ password: hash, email })
        .then((newUser) => res.status(ADD).send(newUser))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res
              .status(INVALID_DATA)
              .send({ message: 'one ore more fields not correct' });
          } else if (err.name === 'MongoServerError' && err.code === 11000) {
            return res
              .status(USER_ALREDY_EXIST)
              .send({ message: 'User already exist!' });
          } else {
            res
              .status(SERVER_ERROR)
              .send({ message: SERVER_ERROR_MESSAGE, err });
          }
        });
    })
    .catch((err) => {
      res.status(INVALID_DATA, err).send({ message: 'wrong data type' });
    });
};

router.post('/signin', login);
router.post('/signup', createUsers);
module.exports = router;
