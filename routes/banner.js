const { Router } = require('express');
// const fs = require('fs');
// const path = require('path');
const fs = require('fs');
const path = require('path');
const fileMiddleware = require('../middlewares/banner');
const banner = require('../controllers/banners');

const router = Router();

router.post('/apiS/photoBanner', (req, res) => {
  console.log('banner');
  fileMiddleware.array('banners')(req, res, (err) => {
    if (err) {
      console.error('Ошибка при загрузке файла:', err);
      return res.status(500).json({ error: 'Ошибка при загрузке файла' });
    }
    return res.json(req.files);
  });
});

router.delete('/apiS/photoBanner', (req, res) => {
  const pathsToDelete = req.body.photoArr[0].bannerLinks; // Массив с путями к файлам
  console.log('2', pathsToDelete);
  pathsToDelete.forEach((filePath) => {
    console.log('1', filePath);
    const absolutePath = path.join(__dirname, '..', filePath); // Полный путь к файлу

    // Удаление файла
    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.error(`Ошибка при удалении файла ${absolutePath}: ${err}`);
      } else {
        console.log(`Файл ${absolutePath} успешно удален.`);
      }
    });
  });

  res.json({ message: 'Файлы успешно удалены' });
});

router.get('/apiS/banner', banner.getBanners);
router.post('/apiS/banner', banner.createBanner);
router.delete('/apiS/banner', banner.deleteBannersLinks);

module.exports = router;
