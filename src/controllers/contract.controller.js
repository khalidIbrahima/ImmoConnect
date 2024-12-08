const Contract = require('../models/contract.model');

class ContractController {
  static async create(req, res) {
    try {
      const contract = await Contract.create(req.body);
      res.status(201).json({ message: "Contrat créé avec succès", contract });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création du contrat", error: error.message });
    }
  }

  static async getByBailleur(req, res) {
    try {
      const contracts = await Contract.findByBailleur(req.userData.userId);
      res.json(contracts);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des contrats", error: error.message });
    }
  }

  static async getByLocataire(req, res) {
    try {
      const contracts = await Contract.findByLocataire(req.userData.userId);
      res.json(contracts);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des contrats", error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const contract = await Contract.findById(req.params.id);
      if (!contract) {
        return res.status(404).json({ message: "Contrat non trouvé" });
      }
      res.json(contract);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération du contrat", error: error.message });
    }
  }
}

module.exports = ContractController;