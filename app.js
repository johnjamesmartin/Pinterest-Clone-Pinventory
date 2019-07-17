/* Dependencies
 *****************************************/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
// const expressValidator = require('express-validator');
const sass = require('node-sass');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const pinsRouter = require('./routes/pins');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const config = require('./config');
const User = require('./models/user');

const app = express();

/* View engine set-up
 *****************************************/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Middleware
 *****************************************/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
  session({
    secret: config.passport.secret,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pins', pinsRouter);

/* Passport strategy
 *****************************************/
passport.use(
  new GitHubStrategy(
    {
      clientID: config.github.id,
      clientSecret: config.github.secret,
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      const username = profile.username;
      const avatar = profile.photos[0].value;

      const token = accessToken;

      console.log('TIME TO FIND OR CREATE USER');

      User.findOrCreate(
        {
          githubId: profile.id,
          username: username,
          avatar: avatar
        },
        function(err, user) {
          console.log('GOT HERE');
          return cb(err, user);
        }
      );
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.get('/', (req, res, next) => {
  console.log('here');
  res.render('index', {
    test: 'test',
    pins: sample
  });
});

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function(
  req,
  res
) {
  res.render('profile', { user: req.user });
});

app.get('/login/github', passport.authenticate('github'));

app.get('/login', (req, res, next) => {
  console.log('GOT TO LOGIN');
});

app.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

app.get('/auth/github/callback', (req, res, next) => {
  console.log('GITHUB CALLBACK METHOD');
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/'
  })(req, res, next),
    (req, res, next) => {
      res.redirect('/');
    };
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* Connect to database:
 *****************************************/
const { username, password, cluster, params } = config.db; // config takes from .env
const mongoDB = `mongodb+srv://${username}:${password}@${cluster}/${params}`;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.connection
  .on('connected', () => {
    console.log('Connected to database');
  })
  .on('error', console.error.bind(console, 'Error connecting to database:'));

module.exports = app;
