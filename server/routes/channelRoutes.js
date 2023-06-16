const express = require('express');
const router = express.Router();
const {createChannelController} = require('../controllers/channelController')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

router.post('/create', upload.single('image'), createChannelController)

module.exports = router