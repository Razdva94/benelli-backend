/* eslint-disable import/no-extraneous-dependencies */
const Unauthorized = require('./UnauthorizedError');
require('dotenv').config();

exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Unauthorized('Необходима авторизация'));
    return;
  }
  next();
};
