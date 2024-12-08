const express = require('express');
const { body } = require('express-validator');
const PropertyController = require('../controllers/property.controller');
const authMiddleware = require('../middleware/auth.middleware');
const checkRole = require('../middleware/checkRole.middleware');
const router = express.Router();

// Middleware d'authentification pour toutes les routes
router.use(authMiddleware);

// Validation des données de propriété
const propertyValidation = [
  body('adresse').notEmpty().withMessage('L\'adresse est requise'),
  body('type').notEmpty().withMessage('Le type de propriété est requis'),
  body('prix').isNumeric().withMessage('Le prix doit être un nombre'),
  body('description').notEmpty().withMessage('La description est requise'),
  body('statut').isIn(['disponible', 'loué', 'en_maintenance']).withMessage('Statut invalide')
];

// Routes pour les bailleurs uniquement
router.post('/', 
  checkRole(['Bailleur']), 
  propertyValidation,
  PropertyController.create
);

router.put('/:id', 
  checkRole(['Bailleur']), 
  propertyValidation,
  PropertyController.update
);

router.delete('/:id', 
  checkRole(['Bailleur']), 
  PropertyController.delete
);

router.get('/bailleur', 
  checkRole(['Bailleur']), 
  PropertyController.getByBailleur
);

// Route publique pour voir les détails d'une propriété
router.get('/:id', PropertyController.getById);

module.exports = router;