const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/subscribe-status', userController.subscribeStatusController)
router.post('/toggle-subscriber', userController.toggleSubscriberController)

module.exports = router;