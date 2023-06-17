const express = require('express');
const router = express.Router();
const {createChannelController, getChannelStateController, getChannelFromUserController, getChannelController} = require('../controllers/channelController')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

router.post('/create', upload.single('image'), createChannelController)
router.post('/get-state', getChannelStateController)
router.post('/get-from-user', getChannelFromUserController)
router.post('/get', getChannelController)


module.exports = router