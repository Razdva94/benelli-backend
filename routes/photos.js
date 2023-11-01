const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const fileMiddleware = require('../middlewares/file');

const router = Router();

router.post('/apiS/photos', (req, res) => {
  fileMiddleware.array('images')(req, res, (err) => {
    if (err) {
      console.error('Ошибка при загрузке файла:', err);
      return res.status(500).json({ error: 'Ошибка при загрузке файла' });
    }
    return res.json(req.files);
  });
});

router.delete('/apiS/photos', (req, res) => {
  console.log(req.body);
  const pathsToDelete = req.body.photoArr; // Массив с путями к файлам

  pathsToDelete.forEach((filePath) => {
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

module.exports = router;
