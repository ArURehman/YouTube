const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController')

router.get('/:folderName/:key', fileController.get)

module.exports = router