const express = require('express');
const PaymentController = require('../controllers/payment.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/', PaymentController.create);

module.exports = router;