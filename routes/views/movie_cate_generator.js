var keystone = require('keystone');
var async = require('async');
var Movie = keystone.list('Movie');

exports = module.exports = function(Category, cate_key_name, section) { return function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = section;
	locals.movies = [];
	locals.filters = {category: req.params[cate_key_name]};
	locals.category = {};
	locals.categories = [];

	// Load categories
	view.on('init', function (callback) {
		Category.model.find().sort('name').exec(function (err, results) {
			if (err || !results.length) {
				console.log(err);
				return callback(err);
			}

			locals.categories = results; 
			callback();
		});
	});

	// Load the current root_category filter
	view.on('init', function (callback) {
		if (locals.filters.category) {
			Category.model.findOne(locals.filters.category).exec(function (err, result) {
				locals.category = result;
				callback(err);
			});
		} else {
			callback();
		}
	});

	// Load the movies
	view.on('init', function (callback) {
		var q = Movie.paginate({
			page: req.query.page || 1,
			perPage: 8,
			maxPages: 10,
		})
		.where('state', 'published')
		.sort('-publishedDate')
		.populate('author region_categories theme_categories classification_categories');

		if (locals.filters.category) {
			var cate_query = {};
			cate_query[cate_key_name] = locals.filters.category;
			q.where(cate_query);
		}

		q.exec(function (err, results) {
			locals.movies = results;
			callback(err);
		});

	});

	// Render the view
	view.render('movie_cate');
}}
