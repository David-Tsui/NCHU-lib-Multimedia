var keystone = require('keystone');
var async = require('async');
var IntroPost = keystone.list('IntroPost');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'intro';
	locals.movies = [];
	locals.intro = [];
	var routes_name = "中心介紹";
	locals.title = routes_name + ' - 興大多媒體中心';

	view.on('init', function (next) {
		// var q1 = IntroPost.model.find()
		// 	.where({'state':'published'})
		// 	.sort('-publishedDate')
		// 	.populate('author categories');
		
		// q1.exec(function (err, results) {
		// 	locals.intro = results;
		// 	next(err);
		// });
		var q2 = IntroPost.paginate({
			page: req.query.page || 1,
			perPage: 20,
		})
		.where('state', 'published')
		.sort('-publishedDate')
		.populate('author');

		q2.exec(function (err, results) {
			locals.intro = results;
			next(err);
		});
	});
	view.render('intro');
}
