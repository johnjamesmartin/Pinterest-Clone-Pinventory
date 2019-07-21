/* Dependencies:
 *****************************************/
const Pin = require('../models/pin');
const User = require('../models/user');
const Genre = require('../models/genre');

// GET pin list
// Permission: public
// Description: Get a list of pins
exports.index = (req, res) => {
  Pin.find()
    .populate('pin')
    .exec((err, list_pins) => {
      if (err) return next(err);
      if (res.locals.currentUser) console.log(res.locals.currentUser.favs);
      res.render('index', { pins: list_pins, user: res.locals.currentUser });
    });
};

// GET pin list
// Permission: public
// Description: Get a list of pins (to render as a list view)
exports.pin_list_get = (req, res, next) => {
  Pin.find().exec((err, list_pins) => {
    if (err) return next(err);
    res.render('pin_list', {
      title: 'Pin List',
      pins: list_pins
    });
  });
};

// GET pin create
// Permission: private (logged in users only)
// Description: Allow user to get pin creation form
exports.pin_create_get = (req, res, next) => {
  if (res.locals.currentUser) {
    Genre.find()
      .sort([['name', 'ascending']])
      .exec((err, list_genres) => {
        if (err) return next(err);
        res.render('pin_create', {
          title: 'Create Pin',
          genres: list_genres
        });
      });
  } else {
    res.render('permission_denied');
  }
};

// POST pin create
// Permission: private (logged in users only)
// Description: Allow user to post new pin they've created
exports.pin_create_post = (req, res, next) => {
  if (res.locals.currentUser) {
    User.find({ username: res.locals.currentUser.username })
      .populate('user')
      .exec((err, user_obj) => {
        if (err) return next(err);
        Genre.find({ name: req.body.genre })
          .populate('genre')
          .exec((err, genre_obj) => {
            if (err) return next(err);
            const pin = new Pin({
              imageUrl: req.body.imageUrl,
              user: user_obj[0],
              description: req.body.description,
              genre: genre_obj[0],
              savedBy: []
            });
            pin.save(err =>
              err ? console.error(err) : console.log('Successfully created pin')
            );
            res.redirect('/pins/');
          });
      });
  } else {
    res.redirect('/login');
  }
};

// POST pin save
// Permission: private (logged in users only)
// Description: Allow user to save pin (push user id to pin and pin id to user)
exports.pin_save_post = (req, res, next) => {
  if (res.locals.currentUser) {
    // Get user object by username:
    User.findOne({ username: res.locals.currentUser.username })
      .populate('user')
      .exec((err, user_obj) => {
        if (err) return next(err);
        // Get pin object by id:
        Pin.findById(req.params.id)
          .populate('pin')
          .exec((err, pin_obj) => {
            if (err) return next(err);
            pin_obj.toObject();

            const savedBy = pin_obj.savedBy;

            // If pin object's "savedBy" does not include user id, add it — else remove:
            if (!pin_obj.savedBy.includes(user_obj._id)) {
              savedBy.push(user_obj._id);
              pin_obj.savedBy = savedBy;
              pin_obj.save(err =>
                err ? console.error(err) : res.sendStatus(200)
              );
            } else {
              savedBy.splice(savedBy.indexOf(user_obj._id), 1);
              pin_obj.savedBy = savedBy;
              pin_obj.save(err =>
                err ? console.error(err) : res.sendStatus(200)
              );
            }
            user_obj.toObject();

            // If user object's "favs" does not include pin id, add it — else remove:
            if (!user_obj.favs.includes(pin_obj._id)) {
              favs = user_obj.favs;
              favs.push(pin_obj._id);
              user_obj.favs = favs;
              user_obj.save();
            } else {
              favs = user_obj.favs;
              favs.splice(favs.indexOf(pin_obj._id), 1);
              user_obj.favs = favs;
              user_obj.save();
            }
          });
      });
  }
};

// POST pin delete
// Permission: private (own users and admin only)
// Description: Allow user to delete pin (remove user id from pin and pin id from user)
exports.pin_delete_post = (req, res, next) => {
  if (res.locals.currentUser) {
    // Get user object by username:
    User.findOne({ username: res.locals.currentUser.username })
      .populate('user')
      .exec((err, user_obj) => {
        if (err) return next(err);
        // Get pin object by id:
        Pin.findById(req.params.id)
          .populate('pin')
          .exec((err, pin_obj) => {
            if (err) return next(err);
            pin_obj.toObject();

            const savedBy = pin_obj.savedBy;

            // If pin object's "savedBy" does not include user id, remove it:
            if (!pin_obj.savedBy.includes(user_obj._id)) {
              savedBy.splice(savedBy.indexOf(user_obj._id), 1);
              pin_obj.savedBy = savedBy;
              pin_obj.save(err =>
                err ? console.error(err) : res.sendStatus(200)
              );
            }
            user_obj.toObject();

            // If user object's "favs" does not include pin id, remove it:
            if (!user_obj.favs.includes(pin_obj._id)) {
              favs = user_obj.favs;
              favs.splice(savedBy.indexOf(pin_obj._id), 1);
              user_obj.favs = favs;
              user_obj.save();
            }
          });
      });
  }
};
