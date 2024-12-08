const express = require('express');
const ContractController = require('../controllers/contract.controller');
const authMiddleware = require('../middleware/auth.middleware');
const checkRole = require('../middleware/checkRole.middleware');
const router = express.Router();

router.use(authMiddleware);

// Seuls les bailleurs peuvent créer des contrats
router.post('/', checkRole(['Bailleur']), ContractController.create);
router.get('/bailleur', checkRole(['Bailleur']), ContractController.getByBailleur);
router.get('/locataire', checkRole(['Locataire']), ContractController.getByLocataire);
router.get('/:id', ContractController.getById);

module.exports = router;