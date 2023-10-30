const { Router } = require('express');
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

module.exports = router;
