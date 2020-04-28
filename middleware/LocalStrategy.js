const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require("../db/models");

const Strategy = new LocalStrategy({
  passReqToCallback : true,
  session : false
}, (req, username, password, done) => {
  loginAttempt();
  async function loginAttempt() {
    try{
      User.findOne({username}).then((loginUser) => {
        if (loginUser == null) {
          //TODO: show something logical
          console.log('Error no user found');
          return done(null, false);
        }
        else{
          bcrypt.compare(password, loginUser.password, function(err, check) {
            if (err){
              //TODO: show something logical
              console.log('Error while checking password');
              return done();
            }
            else if (check){
              return done(null, [{username: loginUser.username}]);
            }
            else{
              //TODO: show something logical
              console.log('Error wrong login details');
              return done(null, false);
            }
          });
        }
      }).catch((err) => {
        return done(err);
      });
    }
    catch(e){throw (e);}
  }
});

module.exports = Strategy;
