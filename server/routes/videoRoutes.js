const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/get', videoController.getVideosController)
router.post('/tags', videoController.postTagsController)

module.exports = router;