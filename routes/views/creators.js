var keystone                = require('keystone');
var fix_keystone_pagination = require('../helpers/fix_keystone_pagination');
var CreatorsPost            = keystone.list('CreatorsPost');
var CreatorsPostCategory    = keystone.list('CreatorsPostCategory');

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
		category: req.params.category,
	};
	locals.posts = [];
	var routes_name = routes_map[locals.filters.category];
	locals.title = routes_name + ' - 興大多媒體中心';

	// Load all categories
	view.on('init', function (next) {
		if (locals.filters.category) {
			CreatorsPostCategory.model.findOne({ name: routes_name }).exec(function (err, result) {
				locals.category = result;
				// console.log(result);
				next(err);
			});
		} else {
			next();
		}
	});

	// Get the total num
	view.on('init', function (next) {
		var q = CreatorsPost.model.find().where('state', 'published');
		if (locals.category) {
			q.where('categories').in([locals.category]);
		}
		q.exec(function (err, results) {
			locals.posts_count = results.length; 
			next(err);
		});
	});

	view.on('init', function (next) {
		var per_page = 6, max_page = 3;
		var q = CreatorsPost.paginate({
			page    : req.query.page || 1,
			perPage : per_page,
			maxPages: max_page,
		})
		.where('state', 'published')
		.sort('-publishedDate')
		.populate('author categories');

		if (locals.category) {
			q.where('categories').in([locals.category]);
		}

		q.exec(function (err, results) {
			locals.posts       = fix_keystone_pagination(results, locals.posts_count, per_page);
			locals.posts.title = routes_name;
			locals.category    = locals.filters.category;
			next(err);
		});
	});

	// Render the view
	view.render('creators');
}
