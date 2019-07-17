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
      res.render('index', { pins: list_pins });
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

/*
imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  genre: { type: Schema.Types.ObjectId, ref: 'Genre', required: true },
  savedBy: { type: Array, required: true }
*/
exports.pin_create_post = (req, res, next) => {
  if (res.locals.currentUser) {
    User.find({ username: res.locals.currentUser.username })
      .populate('user')
      .exec((err, user_obj) => {
        if (err) return next(err);
        const pin = new Pin({
          imageUrl: req.body.imageUrl,
          user: user_obj[0],
          description: req.body.description,
          genre: req.body.genre,
          savedBy: []
        });
        pin.save(err =>
          err ? console.error(err) : console.log('Successfully created pin')
        );
        res.redirect('/pins/');
      });
  } else {
    res.redirect('/login');
  }
};
