/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
// const multer = require('multer');
const {
  celebrate, Segments, Joi, errors,
} = require('celebrate');
const cors = require('cors');
const path = require('path');
const uploadRouter = require('./routes/photos');
const motorcycleRoutes = require('./routes/motorcycle');
const bannerRoutes = require('./routes/banner');
const loginRoute = require('./routes/login');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { sendMessage } = require('./middlewares/telegram');
const { errorHandler } = require('./middlewares/error');
const { auth } = require('./middlewares/auth');
const WrongIdError = require('./middlewares/WrongIdError');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['https://www.benellispb.ru', 'https://benellispb.ru', 'http://localhost:3001'],
    exposedHeaders: 'Access-Control-Allow-Origin',
    credentials: true,
  }),
);

// https://benellispb.ru
// http://localhost:3001

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

app.use('/', loginRoute);
app.use('/', motorcycleRoutes);
app.use('/', bannerRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/banners', express.static(path.join(__dirname, 'banners')));
app.use('/', uploadRouter);
app.use(auth);
app.use((req, res, next) => {
  const error = new WrongIdError('Маршрут не найден');
  next(error);
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
