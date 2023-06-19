const express = require('express');
const router = express.Router();
const commentControllers = require('../controllers/commentControllers');

router.post('/post', commentControllers.postCommentController);
router.post('/get', commentControllers.getCommentController);
router.post('/get-replies', commentControllers.getRepliesController);
router.post('/count-comments', commentControllers.countCommentsController);
router.post('/count-replies', commentControllers.countRepliesController);

module.exports = router;