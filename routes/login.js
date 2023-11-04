const express = require('express');
const login = require('../controllers/login');

const router = express.Router();
router.post('/apiS/signin', login.login);
router.get('/apiS/signout', login.logout);

module.exports = router;
