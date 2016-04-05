var keystone = require('keystone');
var NewsPost = keystone.list('NewsPost');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'news';
	locals.filters = {
		post: req.params.post,
	};

	// Load the current post
	view.on('init', function (next) {

		var q = NewsPost.model.findOne({
			state: 'published',
			key: locals.filters.post,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.post = result;
			next(err);
		});

	});

	// Load other posts
	// view.on('init', function (next) {

	// 	var q = NewsPost.model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

	// 	q.exec(function (err, results) {
	// 		locals.posts = results;
	// 		next(err);
	// 	});

	// });

	// Render the view
	view.render('news_detail');
}
