var keystone = require('keystone');
var async = require('async');
var NewsPost = keystone.list('NewsPost');
var Movie = keystone.list('Movie');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'index';
	locals.movies = [];
	locals.news = [];

	// Load the news and movies
	view.on('init', function (next) {
		var q1 = Movie.model.find()
			.where('state', 'published')
			.sort('-inDate')
			.populate('author categories');

		q1.exec(function (err, results) {
			locals.movies = results;
			next(err);
		});
	});

	view.on('init', function (next) {
		// var q1 = NewsPost.model.find()
		// 	.where({'state':'published'})
		// 	.sort('-publishedDate')
		// 	.populate('author categories');
		
		// q1.exec(function (err, results) {
		// 	locals.news = results;
		// 	next(err);
		// });
		var q2 = NewsPost.paginate({
			page: req.query.page || 1,
			perPage: 6,
			maxPages: 10,
		})
		.where('state', 'published')
		.sort('-publishedDate')
		.populate('author');

		q2.exec(function (err, results) {
			locals.news = results;
			console.log("results: ", results);
			next(err);
		});
	});
	view.render('index');
}
