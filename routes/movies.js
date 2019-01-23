var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Movies = mongoose.model('Movie');

// https://github.com/estiam/4ELKE4C1819


/* GET home page. */
router.get('/', function (req, res, next) {
  Movies.find({}, (err, items) => {
    if (err)
      return res.send(err);

    return res.render('moviesList', { movies: items });

  });
});

router.get('/create', (req, res, next) => {
  res.render('create');
});

router.post('/create', (req, res, next) => {
  const movie = req.body;

  Movies.create(movie, (err, item) => {
    if (err)
      return res.send(err);

    return res.redirect('/movies');
  });
});
router.get('/edit/:id', (req, res, next) => {
  Movies.findById(req.params.id, (err, item) => {
    if(err) return res.send(err);

    res.render('edit', { movie: item });
  });
});

router.post('/edit/:id', (req, res, next) => {
  const movie = req.body;

  Movies.findByIdAndUpdate(req.params.id, movie, (err, item) => {
    if (err)
      return res.send(err);

    return res.redirect('/movies');
  });
});





module.exports = router;
