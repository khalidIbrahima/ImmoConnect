const express = require('express');
const passport = require('passport');
const AuthController = require('../controllers/auth.controller');
const router = express.Router();

// Routes d'authentification classique
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Routes d'authentification Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  AuthController.socialAuthCallback
);

// Routes d'authentification Facebook
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  AuthController.socialAuthCallback
);

module.exports = router;