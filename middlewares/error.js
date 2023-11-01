/* eslint-disable no-unused-vars */
exports.errorHandler = (err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500).send(err);
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
};
