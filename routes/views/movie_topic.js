var keystone = require('keystone');
var async = require('async');
var Movie = keystone.list('Movie');
var Category = keystone.list('MovieTopicCategory');
const cate_key_name = 'topic_category';

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'movie_topic';
	locals.movies = [];
	locals.filters = {category: req.params[cate_key_name]};
	locals.category = {};
	locals.categories = [];

	// Load categories
	view.on('init', function (callback) {
		console.log("Load categories");
		Category.model.find().sort('name').exec(function (err, results) {
			if (err || !results.length) {
				console.log(err);
				return callback(err);
			}
			console.log("Load categories done");

			locals.categories = results; 
		});
	});

	// Load the current root_category filter
	view.on('init', function (callback) {
		console.log("Load the current root_category filter");
		if (req.params[cate_key_name]) {
			Category.model.findOne({ key: req.params[cate_key_name] }).exec(function (err, result) {
				locals.category = result;
				callback(err);
			});
		} else {
			callback();
		}
	});

	// Load the movies
	view.on('init', function (callback) {
		console.log("Load the movies");
		var q = Movie.paginate({
			page: req.query.page || 1,
			perPage: 8,
			maxPages: 10,
		})
		.where('state', 'published')
		.sort('-publishedDate')
		.populate('author region_categories theme_categories classification_categories');

		if (req.params[cate_key_name]) {
			q.where({topic_category: req.params[cate_key_name]});
		}

		q.exec(function (err, results) {
			locals.movies = results;
			callback(err);
		});

	});

	// Render the view
	view.render('movie_blog');
}
