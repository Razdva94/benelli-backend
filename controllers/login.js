/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
const jsonWebToken = require('jsonwebtoken');
const Unauthorized = require('../middlewares/UnauthorizedError');
require('dotenv').config();

exports.login = async (req, res, next) => {
  try {
    const {
      NODE_ENV, JWT_SECRET, USER_ID, USER_LOGIN, USER_PASSWORD,
    } = process.env;
    const { login, password } = req.body;
    const isValidPass = (USER_LOGIN === String(login) && USER_PASSWORD === String(password));
    if (isValidPass) {
      const jwtToken = jsonWebToken.sign(
        {
          _id: USER_ID,
        },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res.cookie('jwt', jwtToken, {
        maxAge: 360000000000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.send({ data: true });
    } else {
      next(new Unauthorized('Неверный пароль.'));
    }
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res, next) => {
  try {
    res.cookie('jwt', null, { maxAge: 0 });
    res.status(200).json('Выход из админки');
  } catch (error) {
    next(error);
  }
};
