// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const { motoName } = req.query;
    cb(null, `${motoName}-${file.originalname}`);
  },
});
module.exports = multer({ storage });
