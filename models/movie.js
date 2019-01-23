const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieSchema = new Schema({
  title: String,
  release_date: Date,
  imdb_rating: Number,
  runtime: Number,
  summary: String,
  actors: [String]
});

module.exports = mongoose.model('Movie', MovieSchema);