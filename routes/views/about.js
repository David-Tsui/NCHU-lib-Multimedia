var keystone = require('keystone');
var async = require('async');
var AboutPost = keystone.list('AboutPost');
var AboutPostCategory = keystone.list('AboutPostCategory');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var routes_map = {
		intro: '中心介紹',
		rules: '相關規則'
	};

	// Init locals
	locals.section = 'news';
	locals.filters = {
		category: req.params.category,
	};
	locals.news = [];
	var routes_name = routes_map[locals.filters.category];
	locals.title = routes_name + ' - 興大多媒體中心';

	// Load the current category filter
	view.on('init', function (next) {
		if (req.params.category) {
			AboutPostCategory.model.findOne({ name: routes_name }).exec(function (err, result) {
				locals.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the news
	view.on('init', function (next) {
		var q = AboutPost.model.find()
			.where({'state':'published'})
			.sort('-publishedDate')
			.populate('author categories');

		if (locals.category) {
			q.where('categories').in([locals.category]);
		}

		q.exec(function (err, results) {
			locals.news = results;
			// console.log("results: ", results);
			next(err);
		});
	});

	view.render('center');
}
