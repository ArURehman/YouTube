const express = require('express');
const router = express.Router();
const { signupController } = require('../controllers/authControllers')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

router.post('/signup', upload.single('image'), signupController)

module.exports = router