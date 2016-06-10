var keystone = require('keystone');
var async = require('async');
var Movie = keystone.list('Movie');
const DATE_FIELD = 'inDate';

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'new';
	locals.movies = [];
	locals.filters = {
		date: req.params.month
	};
	locals.category = undefined;
	locals.categories = [];

	// Load categories
	view.on('init', function (callback) {
		Movie.model.findOne()
			.where('state', 'published')
			.sort(`-${DATE_FIELD}`)
			.exec(function(err, latest_movie) {
				if (err || !latest_movie) return callback(err);
				var date = new Date(latest_movie[DATE_FIELD]);
				for(var i = 0; i < 10; i++){
					locals.categories.push({
						name: `${date.getFullYear()}-${date.getMonth() + 1}`
					});
					if(date.getMonth() == 0)
						date.setFullYear(date.getFullYear() - 1, 11);
					else
						date.setMonth(date.getMonth() - 1);
				}
				
				if (locals.filters.date)
					date = new Date(locals.filters.date);
				else
					date = new Date(latest_movie[DATE_FIELD]);
				var year = date.getFullYear();
				var month = date.getMonth();
				locals.category = {
					name: `${year}-${month + 1}`
				};
				
				var where_between = {},
					query = Movie.paginate({
						page: req.query.page || 1,
						perPage: 16,
						maxPages: 10,
					});
				if(month == 11)
					where_between[DATE_FIELD] = {
						$gte: new Date(year, month),
						$lt: new Date(year + 1, 0)
					};
				else
					where_between[DATE_FIELD] = {
						$gte: new Date(year, month),
						$lt: new Date(year, month + 1)
					};
				query.where(where_between);

				query
					.where('state', 'published')
					.sort(`-${DATE_FIELD}`)
					.populate('author region_categories theme_categories classification_categories')
					.exec(function (err, movies) {
						if (err) return callback(err);
						locals.movies = movies;
						callback(err);
				});
			});

	});

	// Render the view
	view.render('movie_cate');
};
