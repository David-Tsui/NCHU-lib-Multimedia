var keystone = require('keystone');
var async = require('async');
var fix_keystone_pagination = require('../helpers/fix_keystone_pagination');
var Movie = keystone.list('Movie');
var MovieRootCategory = keystone.list('MovieRootCategory');
var MovieRegionCategory = keystone.list('MovieRegionCategory');
var MovieThemeCategory = keystone.list('MovieThemeCategory');
var MovieClassificationCategory = keystone.list('MovieClassificationCategory');
var MovieSubCategories = {
	以地區分類: MovieRegionCategory, 
	以主題分類: MovieThemeCategory,
	以級別分類: MovieClassificationCategory
}, ModelColumnMapping = {
	以地區分類: 'region_categories',
	以主題分類: 'theme_categories',
	以級別分類: 'classification_categories'
};

function createObj(root_cat, sub_cats) {
	this.root_cat = root_cat;
	this.sub_cats = sub_cats;
}

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'movie_blog';
	locals.filters = {
		root_category: req.params.root_category,
		category: req.params.category
	};
	locals.movies = [];
	locals.root_categories = [];
	locals.categories = [];

	// Load root categories
	view.on('init', function (callback) {
		MovieRootCategory.model.find().sort('name').exec(function (err, results) {
			if (err || !results.length) {
				return callback(err);
			}

			locals.root_categories = results; 
			async.each(locals.root_categories, function(root_cat, callback) {
				var obj_key = root_cat.name;
				MovieSubCategories[obj_key].model.find().sort('name').exec(function (err, results) {
					locals.categories.push(new createObj(root_cat, results));
					callback(err);
				});
			}, function (err) {
				callback(err);
			});
		});
	});

	// Load the counts for each category
	view.on('init', function (callback) {
		locals.categories.forEach(function(category) {
			var root_cat_name = category.root_cat.name;
			var sub_cats = category.sub_cats;
			sub_cats.forEach(function(sub_cat, index) {
				keystone.list('Movie').model.count().where('state', 'published').where(ModelColumnMapping[root_cat_name]).in([sub_cat.id]).exec(function (err, count) {
					sub_cat.movieCount = count;
					
				});
			})
		});
		callback();
	});
	
	// Load the current root_category filter
	view.on('init', function (callback) {
		if (req.params.root_category) {
			MovieRootCategory.model.findOne({ key: locals.filters.root_category }).exec(function (err, result) {
				locals.root_category = result;
				callback(err);
			});
		} else {
			callback();
		}
	});

	// Load the current sub_category filter
	view.on('init', function (callback) {
		if (req.params.category) {
			MovieSubCategories[locals.root_category.name].model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.category = result;
				callback(err);
			});
		} else {
			callback();
		}
	});

	// Get the total num
	view.on('init', function (callback) {
		var q = Movie.model.find().where('state', 'published');
		if (locals.category) {
			q.where(ModelColumnMapping[locals.root_category.name]).in([locals.category]);
		}
		q.exec(function (err, results) {
			locals.movies_count = results.length; 
			callback(err);
		});
	});

	// Load the movies
	view.on('init', function (callback) {
		var per_page = 16, max_page = 10;
		var q = Movie.paginate({
			page: req.query.page || 1,
			perPage: per_page,
			maxPages: max_page,
		})
		.where('state', 'published')
		.sort('-publishedDate')
		.populate('author region_categories theme_categories classification_categories');

		if (locals.category) {
			q.where(ModelColumnMapping[locals.root_category.name]).in([locals.category]);
		}

		q.exec(function (err, ret) {
			locals.movies = fix_keystone_pagination(ret, locals.movies_count, per_page);
			callback(err);
		});

	});

	// Render the view
	view.render('movie_blog');
}
