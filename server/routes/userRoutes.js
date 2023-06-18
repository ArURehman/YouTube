const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/subscribe-status', userController.subscribeStatusController)
router.post('/subscribe', userController.subscribeController)
router.post('/unsubscribe', userController.unsubscribeController)

module.exports = router;