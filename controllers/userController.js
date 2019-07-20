/* Dependencies
 *****************************************/
const User = require('../models/user');
const Pin = require('../models/pin');

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
/*
exports.user_profile_get = (req, res, next) => {
  console.log(res.locals.currentUser);
  if (res.locals.currentUser) {
    User.findOne({ username: res.locals.currentUser.username })
      .populate('user')
      .exec((err, user_obj) => {
        if (err) return next(err);
        Pin.find(
          {
            _id: { $in: user_obj.favs }
          },
          (err, favs) => {
            Pin.find({ user: res.locals.currentUser._id })
              .populate('pin')
              .exec((err, pins) => {
                if (err) return next(err);
                res.render('profile', {
                  user: req.user,
                  favourites: favs,
                  user_pins: pins
                });
              });
          }
        );
      });
  } else {
    res.redirect('/login');
  }
};
*/

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
