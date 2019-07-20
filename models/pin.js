/* Dependencies
 *****************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

/* Schema
 *****************************************/
const PinSchema = new Schema({
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userInfo: { type: String },
  genre: { type: Schema.Types.ObjectId, ref: 'Genre', required: true },
  savedBy: { type: Array, required: true }
});

PinSchema.plugin(findOrCreate);

module.exports = mongoose.model('Pin', PinSchema);
