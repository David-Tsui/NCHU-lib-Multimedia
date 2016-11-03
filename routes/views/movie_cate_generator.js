var keystone                = require('keystone');
var async                   = require('async');
var co                      = require('co');
var fix_keystone_pagination = require('../helpers/fix_keystone_pagination');
var Movie                   = keystone.list('Movie');

exports = module.exports = function(Category, cate_key_name, section, title) { 
	return function (req, res) {
		var view = new keystone.View(req, res);
		var locals = res.locals;

		// Init locals
		locals.section = section;
		locals.movies = [];
		locals.filters = {
			category: req.params[cate_key_name]
		};
		locals.category = undefined;
		locals.categories = [];
		locals.title = title + ' - 興大多媒體中心';

		view.on('init', function (callback) {
			co(function*() {
				var results = yield {
					// Load categories
					categories: Category.model.find().sort('-startDate').exec().where('state', '進行中'),

					// Load the current root_category filter
					category: (locals.filters.category ? 
						Category.model.where({name: locals.filters.category}) :
						Category.model).findOne().sort('-startDate').exec(),
				};

				for (var attrname in results) { 
					locals[attrname] = results[attrname]; 
				}

				var movie_paginated_query = Movie.paginate({
					page    : req.query.page || 1,
					perPage : 16,
					maxPages: 10,
				})
				.where('state', 'published')
				.sort('-publishedDate')
				.populate('author region_categories theme_categories classification_categories');
				var movie_counts_query = Movie.model.find().where('state', 'published');

				var cate_query = {};
				cate_query[cate_key_name] = results.category._id;
				movie_paginated_query.where(cate_query);
				movie_counts_query.where(cate_query);

				results = yield {
					// Load movies
					movies: new Promise(function(resolve, reject){
						movie_paginated_query.exec(function(err, ret) { 
							if (err) {
								reject(err);
							}	else {
								resolve(ret);
							}
						})
					}),
					movies_vanilla_result: movie_counts_query.exec()
				};

				locals.movies =	fix_keystone_pagination(results.movies,	results.movies_vanilla_result.length, 16);
					
			}).then(
				function(){ 
					callback(); 
				},
				function(e){ 
					console.error(e, e.stack); callback(e); 
				}
			);
		});

		// Render the view
		view.render('movie_cate');
	};
}
