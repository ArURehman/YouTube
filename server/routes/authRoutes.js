const express = require('express');
const router = express.Router();
const { signupController, loginController, logoutController, infoController } = require('../controllers/authControllers');
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({storage:storage})

router.post('/signup', upload.single('image'), signupController)
router.post('/login', loginController)
router.get('/info', infoController)
router.post('/logout', logoutController)

module.exports = router