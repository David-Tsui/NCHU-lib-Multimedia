var keystone = require('keystone');
var async = require('async');
var co = require('co');
var fix_keystone_pagination = require('../helpers/fix_keystone_pagination');
var Movie = keystone.list('Movie');
const DATE_FIELD = 'inDate';

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.title = '新進影音 - 興大多媒體中心';
	locals.section = 'new';
	locals.movies = [];
	locals.filters = {
		date: req.params.month
	};
	locals.category = undefined;
	locals.categories = [];

	// Load categories
	view.on('init', function (callback) {
		co(function*() {
			var latest_movie = yield Movie.model.findOne()
				.where('state', 'published')
				.sort(`-${DATE_FIELD}`)
				.exec();
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
				movie_paginated_query = Movie.paginate({
					page: req.query.page || 1,
					perPage: 16,
					maxPages: 10,
				}),
				movie_counts_query = Movie.model.find();

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
			movie_paginated_query = movie_paginated_query
				.where(where_between)
				.where('state', 'published')
				.sort(`-${DATE_FIELD}`)
				.populate('author region_categories theme_categories classification_categories');
			movie_counts_query = movie_counts_query
				.where(where_between)
				.where('state', 'published');

			var results = yield {
				// Load movies
				movies: new Promise(function(resolve, reject){
					movie_paginated_query.exec(function(e, r) { e ? reject(e) : resolve(r) });
				}),
				movies_vanilla_result: movie_counts_query.exec()
			};
			locals.movies =
				fix_keystone_pagination(results.movies,
																results.movies_vanilla_result.length, 16);

		}).then(function(){ callback(); },
			function(e) { console.error(e, e.stack); callback(e); }
		);

	});

	// Render the view
	view.render('movie_cate');
};
