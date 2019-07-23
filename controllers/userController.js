/* Dependencies
 *****************************************/
const User = require('../models/user');
const Pin = require('../models/pin');
const Genre = require('../models/genre');

// GET list of users
// Permission: private (admin only)
// Description: Display a list of users
exports.user_list_get = (req, res, next) => {
  User.find()
    .sort([['username', 'ascending']])
    .exec((err, list_users) => {
      if (err) return next(err);
      res.render('user_list', {
        title: 'User List',
        user_list: list_users
      });
    });
};

// GET user profile
// Permission: public
// Description: Get and display user profile
exports.user_profile_get = (req, res, next) => {
  const usernameStr = req.params.username.toString();
  User.findOne({ username: usernameStr })
    .populate('user')
    .exec((err, user_obj) => {
      if (err) return next(err);
      Pin.find(
        {
          _id: { $in: user_obj.favs }
        },
        (err, favs) => {
          Pin.find({ user: user_obj._id })
            .populate('pin')
            .exec((err, pins) => {
              if (err) return next(err);
              res.render('profile', {
                isLoggedIn: res.locals.currentUser || false,
                user: user_obj,
                favourites: favs,
                user_pins: pins
              });
            });
        }
      );
    });
};

// GET edit favourites
// Permission: private (own user or admin)
// Description: Get user's favourites to edit
exports.user_edit_favourites_get = (req, res, next) => {
  const usernameStr = req.params.username.toString();
  if (
    res.locals.currentUser &&
    res.locals.currentUser.username == usernameStr
  ) {
    User.findOne({ username: usernameStr })
      .populate('user')
      .exec((err, user_obj) => {
        if (err) return next(err);
        Pin.find(
          {
            _id: { $in: user_obj.favs }
          },
          (err, favs) => {
            Pin.find({ user: user_obj._id })
              .populate('pin')
              .exec((err, pins) => {
                if (err) return next(err);
                res.render('user_edit_favourites', {
                  favourites: favs,
                  user: user_obj
                });
              });
          }
        );
      });
  } else {
    res.redirect('/login');
  }
};

// GET edit pins
// Permission: private (own user or admin)
// Description: Get user's pins to edit
exports.user_edit_pins_get = (req, res, next) => {
  const usernameStr = req.params.username.toString();
  if (
    res.locals.currentUser &&
    res.locals.currentUser.username == usernameStr
  ) {
    User.findOne({ username: usernameStr })
      .populate('user')
      .exec((err, user_obj) => {
        if (err) return next(err);
        Pin.find(
          {
            _id: { $in: user_obj.favs }
          },
          (err, favs) => {
            Pin.find({ user: user_obj._id })
              .populate('pin')
              .exec((err, pins) => {
                if (err) return next(err);
                res.render('user_edit_pins', {
                  pins: pins,
                  user: user_obj
                });
              });
          }
        );
      });
  } else {
    res.redirect('/login');
  }
};

// GET edit favourites
// Permission: private (own user or admin)
// Description: Get user's favourites to edit
exports.user_remove_favourite_post = (req, res, next) => {
  console.log('User removed favourite');
  const usernameStr = res.locals.currentUser.username.toString();
  User.findOne({ username: usernameStr })
    .populate('user')
    .exec((err, user_obj) => {
      if (err) return next(err);

      // Remove pin id from user favs:
      user_obj.toObject();
      favs = user_obj.favs;
      favs.splice(favs.indexOf(req.params.pin), 1);
      user_obj.favs = favs;
      user_obj.save(err => (err ? console.error(err) : res.sendStatus(200)));

      // Remove user id from pin's saveBy arr:
      Pin.findOne({ _id: req.params.pin })
        .populate('pin')
        .exec((err, pin_obj) => {
          if (err) return next(err);
          pin_obj.toObject();
          const savedBy = pin_obj.savedBy;
          savedBy.splice(savedBy.indexOf(user_obj._id), 1);
          pin_obj.savedBy = savedBy;
          pin_obj.save(err =>
            err ? console.error(err) : console.log('Success')
          );
        });
    });
};

// GET list of users
// Permission: private (admin only)
// Description: Display a list of users
exports.user_wall_get = (req, res, next) => {
  Pin.find()
    .populate('pin')
    .exec((err, list_pins) => {
      if (err) return next(err);

      Genre.find()
        .populate('pin')
        .exec((err, list_genres) => {
          if (err) return next(err);
          User.find()
            .populate('user')
            .exec((err, list_users) => {
              if (err) return next(err);
              res.render('user_wall', {
                pins: list_pins,
                users: list_users,
                genres: list_genres,
                user: req.params.username,
                isLoggedIn: res.locals.currentUser || false
              });
            });
        });
    });
};
