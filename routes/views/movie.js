var keystone = require('keystone');
var Movie = keystone.list('Movie');
// var MovieComment = keystone.list('MovieComment');

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

		var q = Movie.model.findOne({
			state: 'published',
			key: locals.filters.movie,
		}).populate('author region_categories theme_categories classification_categories');

		q.exec(function (err, result) {
			locals.movie = result;
			locals.title = result.name + ' - 興大多媒體中心';
			// console.log(locals.movie);
			next(err);
		});

	});

	// Load other movies
	// view.on('init', function (next) {

	// 	var q = Movie.model.find().where('state', 'published').sort('-inDate').populate('author').limit('4');

	// 	q.exec(function (err, results) {
	// 		locals.movies = results;
	// 		next(err);
	// 	});

	// });

	// Render the view
	view.render('movie');
}
