const express = require('express');
const ReportController = require('../controllers/report.controller');
const authMiddleware = require('../middleware/auth.middleware');
const checkRole = require('../middleware/checkRole.middleware');
const router = express.Router();

router.use(authMiddleware);

// Seuls les locataires peuvent créer des signalements
router.post('/', checkRole(['Locataire']), ReportController.create);
router.get('/propriete/:id', checkRole(['Bailleur']), ReportController.getByProperty);
router.get('/locataire', checkRole(['Locataire']), ReportController.getByLocataire);

module.exports = router;