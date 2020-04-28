const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwtSecret = require('../config/jwtConfig');

const { User } = require("../db/models");

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret.secret,
};

module.exports = new JWTstrategy(opts, (jwt_payload, done) => {
  try {
    User.findOne({username: jwt_payload.id}).then(user => {
      if (user) {
        console.log('user found in db in passport');
        // note the return removed with passport JWT - add this return for passport local
        done(null, user);
      } else {
        console.log('user not found in db');
        done(null, false);
      }
    });
  } catch (err) {
    done(err);
  }
});
