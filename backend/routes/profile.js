const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/', profileController.handleProfile);
router.get('/', profileController.getProfile);

module.exports = router;