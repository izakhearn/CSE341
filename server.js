const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const mongodb = require('./data/database');
const passport = require('passport');
const expressSession = require('express-session');

app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

const GitHubStrategy = require('passport-github2').Strategy;
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
} 
));

app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
});

app.use(express.json());



app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
});
app.use('/', require('./routes/index'));

app.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    };
    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
}
);
