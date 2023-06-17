const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

router.post('/create', upload.single('image'), channelController.createChannelController)
router.post('/get-state', channelController.getChannelStateController)
router.post('/get-from-user', channelController.getChannelFromUserController)
router.post('/get', channelController.getChannelController)
router.post('/upload', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), channelController.uploadVideoController)

module.exports = router