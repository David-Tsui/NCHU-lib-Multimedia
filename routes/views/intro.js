var keystone = require('keystone');
var async = require('async');
var IntroPost = keystone.list('IntroPost');
var _ = require('lodash');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'intro';
	locals.intro = [];
	var routes_name = "中心介紹";
	locals.title = routes_name + ' - 興大多媒體中心';

	view.on('init', function (next) {
		var q = IntroPost.paginate({
			page: req.query.page || 1,
			perPage: 20,
		})
		.where('state', 'published')
		.sort('-publishedDate')
		.populate('author');

		q.exec(function (err, results) {
			var temp_results = results.results;
			results.results = temp_results.map(function(result) {
				if (_.isObject(result.image)) {
					result.image = {};
					return result;
				}
			})
			locals.intro = results;
			next(err);
		});
	});
	view.render('intro');
}
