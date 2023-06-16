const express = require('express');
const router = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const { userProfilePicController } = require('../controllers/userControllers')


module.exports = router