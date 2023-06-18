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
router.post('/update-desc', channelController.updateDescController)
router.post('/update-email', channelController.updateEmailController)
router.post('/sub-count', channelController.subscriberCountController)
router.post('/vid-count', channelController.getVideoCountController)
router.post('/get-links', channelController.getLinksController)
router.post('/add-link', channelController.addLinkController)
router.post('/delete-link', channelController.deleteLinkController)

module.exports = router