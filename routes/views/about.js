var keystone = require('keystone');
var async = require('async');
var AboutPost = keystone.list('AboutPost');
var AboutPostCategory = keystone.list('AboutPostCategory');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var routes_map = {
		intro  : '中心介紹',
		rules  : '相關規則',
		spaces : '空間規劃',
		opening: '開放時間'
	};

	// Init locals
	locals.section = 'about';
	locals.filters = {
		category: req.params.category,
	};
	locals.posts = [];
	var routes_name = routes_map[locals.filters.category];
	locals.title = routes_name + ' - 興大多媒體中心';
	locals.category_name = routes_name;

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

	// Load the posts
	view.on('init', function (next) {
		var q = AboutPost.model.find()
			.where({'state':'published'})
			.sort('-publishedDate')
			.populate('author categories');

		if (locals.category) {
			q.where('categories').in([locals.category]);
		}

		q.exec(function (err, results) {
			locals.posts = results;
			console.log("results: ", results);
			next(err);
		});
	});

	view.render('about');
}
