const express = require('express');
const {
  celebrate, Segments, Joi, errors,
} = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { sendMessage } = require('./middlewares/telegram');
const { errorHandler } = require('./middlewares/error');

const app = express();
app.use(express.json());
app.use(requestLogger);

app.post(
  'api/send-info',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().min(2).max(30)
        .required(),
      name: Joi.string().min(2).max(30).required(),
      service: Joi.string().required(),
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
