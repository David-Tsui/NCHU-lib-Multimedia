var keystone = require('keystone');
var Media = keystone.list('Media');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'media';
	locals.filters = {
		media: req.params.media,
	};

	// Load the current media
	view.on('init', function (next) {

		var q = Media.model.findOne({
			state: 'published',
			key: locals.filters.media,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.media = result;
			next(err);
		});

	});

	// Load other medias
	view.on('init', function (next) {

		var q = Media.model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.medias = results;
			next(err);
		});

	});

	// Render the view
	view.render('media');
}
