const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.userId);
    if (user && user.active) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findBySocialId('Google', profile.id);
    
    if (!user) {
      user = await User.create({
        nom: profile.displayName,
        email: profile.emails[0].value,
        type: 'Standard',
        loginType: 'Google',
        socialId: profile.id,
        active: true
      });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/api/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findBySocialId('Facebook', profile.id);
    
    if (!user) {
      user = await User.create({
        nom: profile.displayName,
        email: profile.emails[0].value,
        type: 'Standard',
        loginType: 'Facebook',
        socialId: profile.id,
        active: true
      });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = passport;