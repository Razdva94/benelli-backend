/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const {
  celebrate, Segments, Joi, errors,
} = require('celebrate');
const cors = require('cors');
const path = require('path');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { sendMessage } = require('./middlewares/telegram');
const { errorHandler } = require('./middlewares/error');

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const { NODE_ENV, BAZE_URL } = process.env;
const mongoURI = NODE_ENV === 'production' ? BAZE_URL : 'mongodb://0.0.0.0:27017/motodb';
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
app.use(requestLogger);
app.use(
  cors({
    origin: 'https://benellispb.ru',
    exposedHeaders: 'Access-Control-Allow-Origin',
    credentials: true,
  }),
);

// https://benellispb.ru
// http://localhost:3001
app.post(
  '/apiS/send-info',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      motoName: Joi.string().required(),
      name: Joi.string().min(2).max(30).required(),
      mobileNumber: Joi.string().required(),
      message: Joi.string().min(2).optional(),
    }),
  }),
  sendMessage,
);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
