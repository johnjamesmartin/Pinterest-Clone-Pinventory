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

exports.user_profile_get = (req, res, next) => {
  console.log(res.locals.currentUser);
  if (res.locals.currentUser) {
    Pin.find({ user: res.locals.currentUser._id })
      .populate('pin')
      .exec((err, pins) => {
        if (err) return next(err);
        console.log(pins);
        res.render('profile', { user: req.user, user_pins: pins });
      });
  } else {
    res.redirect('/login');
  }
};
