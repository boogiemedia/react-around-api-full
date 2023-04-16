const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();
const {
  OK,
  ADD,
  INVALID_DATA,
  NOT_FOUND,
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
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(() =>
      res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE })
    );
};
const getProfile = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('user id not found');
      error.status = NOT_FOUND;
      throw error;
    })
    .then((user) => {
      res.status(OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(INVALID_DATA)
          .send({ message: 'make sure that id format is correct' });
      } else if (err.status === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(SERVER_ERROR).send([{ message: SERVER_ERROR_MESSAGE }]);
      }
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

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const me = { _id: req.user._id };
  User.findByIdAndUpdate(
    me,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error('user id not found');
      error.status = NOT_FOUND;
      throw error;
    })
    .then((upd) => res.status(ADD).send(upd))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(INVALID_DATA)
          .send({ message: 'one or more fields are incorrect' });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ message: 'you must fill all fields' });
      } else if (err.status === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const me = { _id: req.user._id };
  User.findByIdAndUpdate(me, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('user id not found');
      error.status = NOT_FOUND;
      throw error;
    })
    .then((upd) => res.status(ADD).send(upd))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA).send({ message: 'something went wrong' });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ message: 'Invalid ID was passed' });
      } else if (err.status === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};
//  ......................end of controller ....................
router.post('/signin', login);
router.get('/users', getUsers);
router.get('/users/:userId', getProfile);
router.post('/signup', createUsers);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
