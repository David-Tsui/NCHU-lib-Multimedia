var keystone = require('keystone');
var Idea = keystone.list('IdeaPost');
var IdeaPostCategory = keystone.list('IdeaPostCategory');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var routes_map = {
		table_game: '玩桌遊',
		Line_stickers: 'Line貼圖徵選活動',
	};

	// Init locals
	locals.section = 'idea';
	locals.filters = {
		category: req.params.type,
	};
	locals.posts = [];
	var routes_name = routes_map[locals.filters.category];
	locals.title = routes_name + ' - 興大多媒體中心';

	// Load all categories
	view.on('init', function (next) {
		if (req.params.type) {
			IdeaPostCategory.model.findOne({ name: routes_name }).exec(function (err, result) {
				locals.category = result;
				console.log(result);
				next(err);
			});
		} else {
			next();
		}
	});

	view.on('init', function (next) {
		var q = Idea.model.find()
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
	view.render('idea');
}
