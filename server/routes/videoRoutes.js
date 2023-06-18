const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/get', videoController.getVideosController)

module.exports = router;