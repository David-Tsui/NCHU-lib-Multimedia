var keystone = require('keystone');
var Maker = keystone.list('MakerPost');
// var MakerComment = keystone.list('MakerComment');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'movie';
	locals.filters = {
		movie: req.params.movie,
	};

	// Load the current movie
	view.on('init', function (next) {

		var q = Maker.model.findOne({
			state: 'published',
			key: locals.filters.movie,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.movie = result;
			next(err);
		});

	});

	// Load other movies
	view.on('init', function (next) {

		var q = Maker.model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.movies = results;
			next(err);
		});

	});

	// Render the view
	view.render('movie');
}
