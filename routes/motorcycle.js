const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const urlPattern = require('../middlewares/urlPattern');
const motorcycle = require('../controllers/motorcycles');

const router = express.Router();

router.post(
  '/apiS/motorcycles',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      mainImage: Joi.string().required().pattern(urlPattern),
      motoName: Joi.string().required(),
      motoPrice: Joi.string().required(),
      motoPerformance: Joi.object().keys({
        mass: Joi.string().required(),
        sizes: Joi.string().required(),
        wheel: Joi.string().required(),
        seatHeight: Joi.string().required(),
        gazValue: Joi.string().required(),
        operatedValue: Joi.string().required(),
        compressionRation: Joi.string().required(),
        power: Joi.string().required(),
        torque: Joi.string().required(),
      }),
      description: Joi.array().items(Joi.string()),
      catalog: Joi.array().items(Joi.string().pattern(urlPattern)),
    }),
  }),
  motorcycle.createMotorcycle,
);

router.get('/apiS/motorcycles', motorcycle.getMotorcycle);
router.delete(
  '/apiS/motorcycles',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      motoName: Joi.string().required(),
    }),
  }),
  motorcycle.deleteMotorcycle,
);

module.exports = router;
