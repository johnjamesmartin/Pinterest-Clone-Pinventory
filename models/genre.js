/* Dependencies
 *****************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Schema
 *****************************************/
const GenreSchema = new Schema({
  name: { type: String, required: true, max: 100 }
});

module.exports = mongoose.model('Genre', GenreSchema);
