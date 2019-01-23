var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Movies = mongoose.model('Movie');

/* GET home page. */
router.get('/', function(req, res, next) {
  Movies.find({}, (err, items) => {
    if(err)
      return res.send(err);

    return res.render('moviesList', { movies: items });

  });
});

module.exports = router;
