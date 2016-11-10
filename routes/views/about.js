var keystone = require('keystone');
var async = require('async');
var AboutPost = keystone.list('AboutPost');
var AboutPostCategory = keystone.list('AboutPostCategory');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var routes_map = {
		intro: '中心介紹',
		open : '開放時間',
		space: '空間說明',
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

	view.on('init', function (next) {
		var q;
		if (routes_name != '空間說明') {
			q = AboutPost.model.find()
			.where({'state':'published'})
			.sort('-publishedDate')
			.populate('author categories');

		} else {
			var q = AboutPost.paginate({
				page: req.query.page || 1,
				perPage: 20,
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author');
		}

		if (locals.category) {
			q.where('categories').in([locals.category]);
		}
		
		q.exec(function (err, results) {
			locals.posts = results;
			next(err);
		});
	});
	if (routes_name == '空間說明') {
		view.render('intro');
	} else {
		view.render('center');
	}
}
