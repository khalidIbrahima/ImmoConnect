const User = require('../models/user.model');

const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userData.userId);
      
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      if (!allowedRoles.includes(user.type)) {
        return res.status(403).json({ 
          message: "Accès non autorisé. Vous n'avez pas les permissions nécessaires." 
        });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ 
        message: "Erreur lors de la vérification des permissions", 
        error: error.message 
      });
    }
  };
};

module.exports = checkRole;