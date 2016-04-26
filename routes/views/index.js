var keystone = require('keystone');
var async = require('async');
var NewsPost = keystone.list('NewsPost');
var NewsPostCategory = keystone.list('NewsPostCategory');
var Movie = keystone.list('Movie');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'index';
	locals.movies = [];

	// Load the news by category filter
	view.on('init', function (next) {
		NewsPostCategory.model.findOne({ name: "最新消息" }).exec(function (err, result) {
			locals.category = result;
			next(err);
		});
	});

	// Load the news and movies
	view.on('init', function (next) {
		var q1 = NewsPost.model.find()
			.where({'state':'published'})
			.sort('-publishedDate')
			.populate('author categories');
		q1.where('categories').in([locals.category]);
		
		q1.exec(function (err, results) {
			locals.news = results;
			next(err);
		});
	});

	view.on('init', function (next) {
		var q2 = Movie.model.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author categories');

		q2.exec(function (err, results) {
			locals.movies = results;
			next(err);
		});
	});

	view.render('index');
}
