const Report = require('../models/report.model');

class ReportController {
  static async create(req, res) {
    try {
      const reportData = {
        ...req.body,
        id_locataire: req.userData.userId
      };
      const report = await Report.create(reportData);
      res.status(201).json({ message: "Signalement créé avec succès", report });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création du signalement", error: error.message });
    }
  }

  static async getByProperty(req, res) {
    try {
      const reports = await Report.findByPropriete(req.params.id);
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des signalements", error: error.message });
    }
  }

  static async getByLocataire(req, res) {
    try {
      const reports = await Report.findByLocataire(req.userData.userId);
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des signalements", error: error.message });
    }
  }
}

module.exports = ReportController;