const Message = require('../models/message.model');

class MessageController {
  static async create(req, res) {
    try {
      const messageData = {
        ...req.body,
        id_expediteur: req.userData.userId
      };
      const message = await Message.create(messageData);
      res.status(201).json({ message: "Message envoyé avec succès", message });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'envoi du message", error: error.message });
    }
  }
}

module.exports = MessageController;