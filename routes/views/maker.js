var keystone = require('keystone');
var Maker = keystone.list('MakerPost');
var MakerPostCategory = keystone.list('MakerPostCategory');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'maker';
	locals.filters = {
		post: req.params.type,
	};

	// Load all categories
	view.on('init', function (next) {
		MakerPostCategory.model.find().sort('name').exec(function (err, results) {
			if (err || !results.length) {
				return next(err);
			}
			locals.categories = results;	
		});
	});

	// Load the current post
	view.on('init', function (next) {
		var q = Maker.model.findOne({
			state: 'published',
			key: locals.filters.post,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.post = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {
		// var q = Maker.model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');
		var q = Maker.model.find().where('state', 'published').sort('-publishedDate').populate('author');
		q.exec(function (err, results) {
			locals.posts = results;
			next(err);
		});

	});

	// Render the view
	view.render('maker');
}
