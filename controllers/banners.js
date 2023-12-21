const Banner = require('../models/banner');
const WrongData = require('../middlewares/WrongDataError');

exports.getBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    next(error);
  }
};

exports.createBanner = async (req, res, next) => {
  try {
    console.log(req.body);
    const banner = new Banner({ ...req.body });
    console.log(banner);
    const savedBanner = await banner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    if (error.statusCode === 400) {
      next(new WrongData('Переданы некорректные данные баннера.'));
    }
    next(error);
  }
};

exports.deleteBannersLinks = async (req, res, next) => {
  try {
    await Banner.deleteMany({});
    res.status(200).json({ message: 'Banners model deleted successfully' });
  } catch (error) {
    next(error);
  }
};
