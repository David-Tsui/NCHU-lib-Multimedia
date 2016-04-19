var keystone = require('keystone');
var async = require('async');
var NewsPost = keystone.list('NewsPost');
var NewsPostCategory = keystone.list('NewsPostCategory');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var routes_map = {
		news: '最新消息',
		intro: '中心介紹',
		rules: '相關規則'
	}

	// Init locals
	locals.section = 'news';
	locals.filters = {
		category: req.params.category,
	};
	locals.news = [];
	var routes_name = routes_map[locals.filters.category];

	// Load the current category filter
	view.on('init', function (next) {
		if (req.params.category) {
			NewsPostCategory.model.findOne({ name: routes_name }).exec(function (err, result) {
				locals.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the news
	view.on('init', function (next) {
		var q = NewsPost.model.find()
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
	
	// view.on('init', function (next) {
	// 	var q = NewsPost.model.find()
	// 		.where({'state':'published'})
	// 		.sort('-publishedDate')
	// 		.populate('author categories');

	// 	q.exec(function (err, results) {
	// 		var ret = [];
	// 		results.forEach(function(out) {
	// 			var arr = out.categories;
	// 			if (arr[0].name == '最新消息') {	// 只取新聞
	// 				ret.push(out);
	// 			}
	// 		});
	// 		locals.news = ret;
	// 		next(err);
	// 	});

	// });

	// Render the view
	console.log("routes_name: ", routes_name);
	if (routes_name == '最新消息')
		view.render('news');
	else {
		view.render('center');
	}
}
