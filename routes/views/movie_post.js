var keystone = require('keystone');
var MoviePost = keystone.list('MoviePost');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var routes_map = {
		Mac_app: 'Mac應用資源',
		free_figures: '免費圖片資源',
		free_broadcast: '免費廣播資源',
		software_curriculums: '電腦軟體課程',
		TED: 'TED'
	};


	// Init locals
	locals.section = 'media';
	locals.filters = {
		media: req.params.media,
	};

	// Load the current media
	view.on('init', function (next) {

		var q = MoviePost.model.findOne({
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

		var q = MoviePost.model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.medias = results;
			next(err);
		});

	});

	// Render the view
	view.render('media');
}
