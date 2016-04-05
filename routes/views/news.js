var keystone = require('keystone');
var async = require('async');
var NewsPost = keystone.list('NewsPost');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'news';
	locals.news = [];

	// Load the news
	view.on('init', function (next) {
		var q = NewsPost.model.find()
			.where({'state':'published'})
			.sort('-publishedDate')
			.populate('author categories');

		q.exec(function (err, results) {
			var ret = [];
			results.forEach(function(out) {
				var arr = out.categories;
				if (arr[0].name == '最新消息') {	// 只取新聞
					ret.push(out);
				}
			});
			locals.news = ret;
			next(err);
		});

	});

	// Render the view
	view.render('news');
}
