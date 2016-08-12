var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ id: id }, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
 usernameField: 'username',
 passwordField: 'password',
 firstNameField: 'firstName',
 emailField: 'email'
},
function(username, password, firstName, email, done) {

  User.findOne({username: username}, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, {message: 'That user does not exist'});

    bcrypt.compare(password, user.password, function (err, res) {
      if (!res) return done(null, false, { message: 'Invalid password' });
      var returnUser = {
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        email: user.email,
        createdAt: user.createdAt,
        id: user.id
      };
      return done(null, returnUser, { message: 'Logged in successfully' });
    })
  })
}));
