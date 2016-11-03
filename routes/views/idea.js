var keystone                = require('keystone');
var fix_keystone_pagination = require('../helpers/fix_keystone_pagination');
var IdeaPost                = keystone.list('IdeaPost');
var IdeaPostCategory        = keystone.list('IdeaPostCategory');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var routes_map = {
		table_game   : '玩桌遊',
		line_stickers: 'line貼圖',
		join_line    : '加入圖書館line@'
	};

	// Init locals
	locals.section = 'idea';
	locals.filters = {
		category: req.params.category,
	};
	locals.posts = [];
	var routes_name = routes_map[locals.filters.category];
	locals.title = routes_name + ' - 興大多媒體中心';

	// Load all categories
	view.on('init', function (next) {
		if (locals.filters.category) {
			IdeaPostCategory.model.findOne({ name: routes_name }).exec(function (err, result) {
				locals.category = result;
				// console.log(result);
				next(err);
			});
		} else {
			next();
		}
	});

	view.on('init', function (next) {
		var q = IdeaPost.model.find()
			.where({'state':'published'})
			.sort('-publishedDate')
			.populate('author categories');

		if (locals.category) {
			q.where('categories').in([locals.category]);
		}

		q.exec(function (err, results) {
			locals.posts       = {results: results};
			locals.posts.title = routes_name;
			locals.category    = locals.filters.category;
			next(err);
		});

	});

	// Render the view
	view.render('idea');
}
