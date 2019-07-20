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
      if (res.locals.currentUser) console.log(res.locals.currentUser.favs);
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

            // my id ends in 6199

            // MAKE PIN HAS USER:
            //console.log('----------------------------');
            //console.log('BEFORE:');
            console.log(pin_obj.savedBy);
            pin_obj.toObject();

            // IF PIN DOES NOT HAVE USER IN SAVEDBY....
            if (!pin_obj.savedBy.includes(user_obj._id)) {
              //console.log('----------------------------');
              //console.log('User not saved, let us save:');
              savedBy = pin_obj.savedBy;
              savedBy.push(user_obj._id);
              pin_obj.savedBy = savedBy;
              pin_obj.save(err => {
                if (err) console.error(err);
                //console.log('Successfully added user to pin\'s "saved by"');
                //console.log('AFTER:');
                console.log(pin_obj.savedBy);
                res.sendStatus(200);
              });
            } else {
              //console.log('----------------------------');
              //console.log('User saved, let us unsave:');
              // REMOVE USER FROM PIN'S SAVED BY
              savedBy = pin_obj.savedBy;
              var indexOfIdToRemove = savedBy.indexOf(user_obj._id);
              savedBy.splice(indexOfIdToRemove, 1);
              pin_obj.savedBy = savedBy;

              pin_obj.save(err => {
                if (err) console.error(err);
                //console.log('Successfully removed user to pin\'s "saved by"');
                //console.log('AFTER:');
                console.log(pin_obj.savedBy);
                res.sendStatus(200);
              });
            }

            // console.log('----------------------------');

            //console.log('----------------------------');
            //console.log('BEFORE:');
            //console.log(user_obj.favs);

            user_obj.toObject();
            // IF USER HAS THIS PIN IN FAVS....
            if (!user_obj.favs.includes(pin_obj._id)) {
              favs = user_obj.favs;
              favs.push(pin_obj._id);
              user_obj.favs = favs;
              user_obj.save(err => {
                if (err) console.error(err);
                //console.log('Successfully added pin to favourites');
                //console.log('AFTER:');
                //console.log(user_obj.favs);
              });
            } else {
              // REMOVE FROM FAVS

              // console.log('----------------------------');
              //console.log('Pin saved, let us unsave:');

              favs = user_obj.favs;

              var indexOfIdToRemove = favs.indexOf(pin_obj._id);
              favs.splice(indexOfIdToRemove, 1);

              // DOES NOT WORK....
              //favs.push(pin_obj._id);
              user_obj.favs = favs;
              user_obj.save(err => {
                if (err) console.error(err);
                //console.log('Successfully removed pin to favourites');
                //console.log('AFTER:');
                //console.log(user_obj);
              });

              //console.log('Already have in favourites');
            }
          });
      });
  }
};
