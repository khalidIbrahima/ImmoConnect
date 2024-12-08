const express = require('express');
const MessageController = require('../controllers/message.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/', MessageController.create);

module.exports = router;