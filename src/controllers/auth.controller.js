const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

class AuthController {
  static async register(req, res) {
    try {
      const { nom, email, telephone, type, password } = req.body;
      
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Cet email est déjà utilisé" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        nom,
        email,
        telephone,
        type,
        loginType: 'Email',
        active: true,
        password: hashedPassword
      });

      const token = jwt.sign(
        { userId: user.id_utilisateur },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: "Utilisateur créé avec succès",
        token,
        user: {
          id: user.id_utilisateur,
          nom: user.nom,
          email: user.email,
          type: user.type
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'inscription", error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }

      if (!user.active) {
        return res.status(403).json({ message: "Compte désactivé. Veuillez contacter l'administrateur." });
      }

      if (user.loginType !== 'Email') {
        return res.status(400).json({ 
          message: `Veuillez vous connecter avec votre compte ${user.loginType}` 
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }

      const token = jwt.sign(
        { userId: user.id_utilisateur },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: "Connexion réussie",
        token,
        user: {
          id: user.id_utilisateur,
          nom: user.nom,
          email: user.email,
          type: user.type
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la connexion", error: error.message });
    }
  }

  static async socialAuthCallback(req, res) {
    try {
      const token = jwt.sign(
        { userId: req.user.id_utilisateur },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Rediriger vers le front-end avec le token
      res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'authentification sociale", error: error.message });
    }
  }
}

module.exports = AuthController;