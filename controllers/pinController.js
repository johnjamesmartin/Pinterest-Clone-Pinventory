/* Dependencies:
 *****************************************/
const Pin = require('../models/pin');

/* Homepage index route:
 *****************************************/
exports.index = (req, res) => {
  Pin.find()
    .populate('pin')
    .exec((err, list_pins) => {
      console.log(list_pins);
      if (err) return next(err);
      res.render('index', { pins: list_pins });
    });
};
