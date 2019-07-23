/* Dependencies:
 *****************************************/
const Pin = require('../models/pin');
const User = require('../models/user');
const Genre = require('../models/genre');

//{ $in: user_obj.favs }

// GET pin list
// Permission: public
// Description: Get a list of pins
exports.index = (req, res) => {
  const genre = () => {
    if (!req.body.genre) {
      return {};
    } else {
      return { genreInfo: { $in: genre } };
    }
  };
  Pin.find(genre())
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
              res.render('index', {
                pins: list_pins,
                users: list_users,
                genres: list_genres,
                user: res.locals.currentUser
              });
            });
        });
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
    User.findOne({ username: res.locals.currentUser.username })
      .populate('user')
      .exec((err, user_obj) => {
        if (err) return next(err);

        user_obj.toObject();

        pinsSubmitted = user_obj.pinsSubmitted;
        pinsSubmitted = pinsSubmitted + 1;
        user_obj.pinsSubmitted = pinsSubmitted;
        user_obj.save(err =>
          err
            ? console.error(err)
            : console.log('Successfully updated pin submitted')
        );

        Genre.findOne({ name: req.body.genre })
          .populate('genre')
          .exec((err, genre_obj) => {
            if (err) return next(err);
            const pin = new Pin({
              imageUrl: req.body.imageUrl,
              user: user_obj,
              description: req.body.description,
              genre: genre_obj,
              userInfo: res.locals.currentUser.username,
              savedBy: []
            });
            pin.save(err =>
              err ? console.error(err) : console.log('Successfully created pin')
            );
            res.redirect(`/users/profile/${res.locals.currentUser.username}`);
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

// POST unsave pin
// Permission: private (own users and admin only)
// Description: Allow user to unsave pin (remove user id from pin and pin id from user)
exports.pin_unsave_post = (req, res, next) => {
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

// POST delete pin
// Permission: private (own users and admin only)
// Description: Allow user to delete pin (remove user id from pin and pin id from user)
exports.pin_delete_post = (req, res, next) => {
  console.log(req.params.id);
  if (res.locals.currentUser) {
    Pin.deleteOne({ _id: req.params.id }, err => {
      if (err) return handleError(err);
      console.log('Successfully deleted pin');
      res.sendStatus(200);
    });
  }
};

// GET pin instance
// Permission: public
// Description: Get pin page
exports.pin_instance_get = (req, res, next) => {
  console.log('GOT PIN INSTANCE GET');
  Pin.findById(req.params.id)
    .populate('pin')
    .exec((err, pin_obj) => {
      pin_obj.toObject();
      User.findOne({ username: pin_obj.userInfo })
        .populate('pin')
        .exec((err, user_obj) => {
          if (err) return next(err);
          user_obj.toObject();
          res.render('pin_instance', {
            loggedIn: res.locals.currentUser || false,
            user: user_obj,
            pin: pin_obj
          });
        });
    });
};
