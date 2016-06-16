var keystone = require('keystone');
var Resources = keystone.list('ResourcesPost');
var ResourcesPostCategory = keystone.list('ResourcesPostCategory');

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
	locals.section = 'resources';
	locals.filters = {
		category: req.params.type,
	};
	locals.posts = [];
	var routes_name = routes_map[locals.filters.category];
	locals.title = routes_name + ' - 興大多媒體中心';

	// Load all categories
	view.on('init', function (next) {
		if (req.params.type) {
			ResourcesPostCategory.model.findOne({ name: routes_name }).exec(function (err, result) {
				locals.category = result;
				console.log(result);
				next(err);
			});
		} else {
			next();
		}
	});

	view.on('init', function (next) {
		var q = Resources.model.find()
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
	view.render('resources');
}
