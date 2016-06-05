var keystone = require('keystone');
var async = require('async');
var Movie = keystone.list('Movie');

exports = module.exports = function(Category, cate_key_name, section) { 
	return function (req, res) {
		var view = new keystone.View(req, res);
		var locals = res.locals;

		// Init locals
		locals.section = section;
		locals.movies = [];
		locals.filters = {category: req.params[cate_key_name]};
		locals.category = undefined;
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
				Category.model.where({name: locals.filters.category}).findOne(function (err, category) {
					if(err) callback(err);
					else if(category) {
						locals.category = category;
						var q = Movie.paginate({
							page: req.query.page || 1,
							perPage: 8,
							maxPages: 10,
						})
						.where('state', 'published')
						.sort('-publishedDate')
						.populate('author region_categories theme_categories classification_categories');
					}
				})
			}
		});

		// Render the view
		view.render('movie_cate');
	};
}
