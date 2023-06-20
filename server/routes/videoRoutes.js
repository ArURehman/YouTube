const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/get', videoController.getVideosController)
router.post('/tags', videoController.postTagsController)
router.post('/playing', videoController.getPlayingVideoController)
router.post('/reaction', videoController.postReactionController)
router.post('/reaction-count', videoController.getReactionCountController)
router.post('/increase-views', videoController.postIncreaseViewsController)

module.exports = router;