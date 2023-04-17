require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth');

const app = express();
const { PORT = 3005 } = process.env;

//  ..........end of defining server.....
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

//  .............end of router........................
app.use(helmet());
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.use('/', authRouter);
app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
// tmp authorization

mongoose.set('debug', true);
mongoose.connect('mongodb://127.0.0.1:27017/aroundb');
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app runs at ${PORT}`);
});
