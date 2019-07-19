/* Dependencies:
 *****************************************/
const Pin = require('../models/pin');
const User = require('../models/user');
const Genre = require('../models/genre');

/* Homepage index route:
 *****************************************/
exports.index = (req, res) => {
  Pin.find()
    .populate('pin')
    .exec((err, list_pins) => {
      if (err) return next(err);
      res.render('index', { pins: list_pins, user: res.locals.currentUser });
    });
};

exports.pin_list_get = (req, res, next) => {
  Pin.find()
    //.sort([['username', 'ascending']])
    .exec((err, list_pins) => {
      if (err) return next(err);
      res.render('pin_list', {
        title: 'Pin List',
        pins: list_pins
      });
    });
};

exports.pin_create_get = (req, res, next) => {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec((err, list_genres) => {
      if (err) return next(err);
      res.render('pin_create', {
        title: 'Create Pin',
        genres: list_genres
      });
    });
};

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

exports.pin_save_post = (req, res, next) => {
  if (res.locals.currentUser) {
    User.findOne({ username: res.locals.currentUser.username })
      .populate('user')
      .exec((err, user_obj) => {
        if (err) return next(err);
        Pin.findById(req.params.id)
          .populate('pin')
          .exec((err, pin_obj) => {
            if (err) return next(err);

            pin_obj.toObject();
            if (!user_obj.favs.includes(pin_obj._id)) {
              savedBy = pin_obj.savedBy;
              savedBy.push(pin_obj._id);
              pin_obj.savedBy = savedBy;
              pin_obj.save(err => {
                if (err) console.error(err);
                console.log('Successfully added user to pin\'s "saved by"');
              });
            } else {
              console.log('Already in pin\'s "saved by"');
            }

            user_obj.toObject();
            if (!user_obj.favs.includes(pin_obj._id)) {
              favs = user_obj.favs;
              favs.push(pin_obj._id);
              user_obj.favs = favs;
              user_obj.save(err => {
                if (err) console.error(err);
                console.log('Successfully added pin to favourites');
              });
            } else {
              console.log('Already have in favourites');
            }
          });
      });
  }
};
