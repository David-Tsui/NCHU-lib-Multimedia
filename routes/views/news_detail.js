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
			locals.title = result.name + ' - 興大多媒體中心';
			next(err);
		});
	});
	view.render('post_detail');
}
