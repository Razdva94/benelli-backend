const Motorcycle = require('../models/motorcycle');
const WrongData = require('../middlewares/WrongDataError');

exports.createMotorcycle = async (req, res, next) => {
  try {
    const moto = new Motorcycle({ ...req.body });
    const savedMoto = await moto.save();
    res.status(201).json(savedMoto);
  } catch (error) {
    if (error.statusCode === 400) {
      next(new WrongData('Переданы некорректные данные мотоцикла.'));
    }
    next(error);
  }
};

exports.getMotorcycle = async (req, res, next) => {
  try {
    const moto = await Motorcycle.find();
    res.status(200).json(moto);
  } catch (error) {
    next(error);
  }
};

exports.deleteMotorcycle = async (req, res, next) => {
  try {
    const { motoName } = req.body;
    const moto = await Motorcycle.findOne({ motoName });
    if (moto) {
      await moto.deleteOne({ _id: moto._id });
      res.status(200).json({ message: 'Мотоцикл успешно удален' });
    } else {
      res.status(404).json({ message: 'Мотоцикл не найден' });
    }
  } catch (error) {
    next(error);
  }
};
