const Payment = require('../models/payment.model');

class PaymentController {
  static async create(req, res) {
    try {
      const payment = await Payment.create(req.body);
      res.status(201).json({ message: "Paiement enregistré avec succès", payment });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'enregistrement du paiement", error: error.message });
    }
  }
}

module.exports = PaymentController;