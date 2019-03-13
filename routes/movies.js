var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Movies = mongoose.model('Movie');

/* GET home page. */
router.get('/', function (req, res, next) {
  Movies.find({}, (err, items) => {
    if (err)
      return res.send(err);

    return res.render('moviesList', { movies: items });

  });
});

router.get('/search', function (req, res, next) {
  Movies.search({ 'query_string' : { 'query' : req.query.q } }, (err, items) => {
    res.json(err ? err : items);
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

router.get('/delete/:id', (req, res, next) => {
  Movies.findByIdAndRemove(req.params.id, (err, item) => {
    if (err)
      return res.send(err);

    return res.redirect('/movies');
  });
});



module.exports = router;
