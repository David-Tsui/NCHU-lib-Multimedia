var keystone = require('keystone');
var Maker = keystone.list('MakerPost');
var MakerPostCategory = keystone.list('MakerPostCategory');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var routes_map = {
		intro: '聯盟介紹',
		organization: '聯盟成員',
		curriculums: '課程一覽',
		activities: '活動一覽'
	};

	// Init locals
	locals.section = 'maker';
	locals.filters = {
		category: req.params.type,
	};
	locals.posts = [];
	var routes_name = routes_map[locals.filters.category];
	locals.title = routes_name + ' - 興大多媒體中心';

	// Load all categories
	view.on('init', function (next) {
		if (req.params.type) {
			MakerPostCategory.model.findOne({ name: routes_name }).exec(function (err, result) {
				locals.category = result;
				console.log(result);
				next(err);
			});
		} else {
			next();
		}
	});

	view.on('init', function (next) {
		var q = Maker.model.find()
			.where({'state':'published'})
			.sort('-publishedDate')
			.populate('author categories');

		if (locals.category) {
			q.where('categories').in([locals.category]);
		}

		q.exec(function (err, results) {
			locals.posts = results;
			// console.log("results: ", results);
			next(err);
		});

	});

	// Render the view
	view.render('maker');
}
