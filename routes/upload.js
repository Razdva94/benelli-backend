const { Router } = require('express');
const fileMiddleware = require('../middlewares/file');

const router = Router();

router.post('/apiS/upload', fileMiddleware.single('moto'), (req, res) => {
  try {
    if (req.file) {
      res.json('файл загружен');
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
