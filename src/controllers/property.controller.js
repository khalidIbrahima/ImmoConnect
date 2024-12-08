const Property = require('../models/property.model');
const { validationResult } = require('express-validator');

class PropertyController {
  static async create(req, res) {
    try {
      // Validation des données
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const propertyData = {
        ...req.body,
        id_bailleur: req.userData.userId
      };
      const property = await Property.create(propertyData);
      res.status(201).json({ message: "Propriété créée avec succès", property });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création de la propriété", error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const propertyId = req.params.id;
      const bailleureId = req.userData.userId;

      const updatedProperty = await Property.update(propertyId, req.body, bailleureId);
      res.json({ message: "Propriété mise à jour avec succès", property: updatedProperty });
    } catch (error) {
      if (error.message === 'Propriété non trouvée ou accès non autorisé') {
        return res.status(403).json({ message: error.message });
      }
      res.status(500).json({ message: "Erreur lors de la mise à jour de la propriété", error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const propertyId = req.params.id;
      const bailleureId = req.userData.userId;

      await Property.delete(propertyId, bailleureId);
      res.json({ message: "Propriété supprimée avec succès" });
    } catch (error) {
      if (error.message === 'Propriété non trouvée ou accès non autorisé') {
        return res.status(403).json({ message: error.message });
      }
      res.status(500).json({ message: "Erreur lors de la suppression de la propriété", error: error.message });
    }
  }

  static async getByBailleur(req, res) {
    try {
      const properties = await Property.findByBailleur(req.userData.userId);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des propriétés", error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const property = await Property.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ message: "Propriété non trouvée" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération de la propriété", error: error.message });
    }
  }
}

module.exports = PropertyController;