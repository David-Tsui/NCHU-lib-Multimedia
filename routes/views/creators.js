var keystone = require('keystone');
var CreatorsPost = keystone.list('CreatorsPost');
var CreatorsPostCategory = keystone.list('CreatorsPostCategory');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var routes_map = {
		intro       : '聯盟介紹',
		activities  : '聯盟活動'
	};

	// Init locals
	locals.section = 'creators';
	locals.filters = {
		category: req.params.type,
	};
	locals.posts = [];
	var routes_name = routes_map[locals.filters.category];
	locals.title = routes_name + ' - 興大多媒體中心';

	// Load all categories
	view.on('init', function (next) {
		if (req.params.type) {
			CreatorsPostCategory.model.findOne({ name: routes_name }).exec(function (err, result) {
				locals.category = result;
				// console.log(result);
				next(err);
			});
		} else {
			next();
		}
	});

	view.on('init', function (next) {
		var q = CreatorsPost.model.find()
			.where({'state':'published'})
			.sort('-publishedDate')
			.populate('author categories');

		if (locals.category) {
			q.where('categories').in([locals.category]);
		}

		q.exec(function (err, results) {
			locals.posts = results;
			locals.posts.title = routes_name;
			next(err);
		});

	});

	// Render the view
	view.render('creators');
}
