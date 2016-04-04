var keystone = require('keystone');
var async = require('async');
var Movie = keystone.list('Movie');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'news';
	locals.movies = [];

	// Load the movies
	view.on('init', function (next) {
		var q = Movie.model.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author categories');

		q.exec(function (err, results) {
			locals.movies = results;
			next(err);
		});

	});

	// Render the view
	view.render('news');
}
