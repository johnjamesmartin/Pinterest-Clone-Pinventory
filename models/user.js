/* Dependencies
 *****************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

/* Schema
 *****************************************/
const UserSchema = new Schema({
  githubId: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  accessLevel: { type: Number, required: true },
  favs: { type: Array },
  pinsSubmitted: { type: Number }
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);
