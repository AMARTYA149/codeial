const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({
        clientID: "350982341333-2u0c8jjachg7nk3ha485ojbkq6bo1bhu.apps.googleusercontent.com" ,
        clientSecret: "x6g6KIegQ8C_vgjevMqSrOVB",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        
    }
))