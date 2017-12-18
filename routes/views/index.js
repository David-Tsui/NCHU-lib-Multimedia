var keystone = require('keystone');
var async    = require('async');
var _        = require('lodash');
var moment   = require('moment');
var NewsPost = keystone.list('NewsPost');
var Movie    = keystone.list('Movie');

exports = module.exports = function (req, res) {

	var view   = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'index';
	locals.movies  = [];
	locals.news    = [];

	function getMonthDateRange(year, month) {
    var startDate = moment([year, month]);
    var endDate = moment(startDate).endOf('month');
    // make sure to call toDate() for plain JavaScript date type
    return { start: startDate, end: endDate };
	}

	// Load the news and movies
	view.on('init', function (next) {
		var dateRange = getMonthDateRange(moment().year(), moment().month());
		var q = Movie.model.find()
			.where('state', 'published')
			// .where({
			// 	state: 'published',
			// 	inDate: {"$gte": dateRange.start, "$lt": dateRange.end}
			// })
			.sort('-inDate')
			.limit(360)
			.populate('author categories');

		q.exec(function (err, results) {
			locals.movies = _.chunk(results, 3);
			next(err);
		});
	});

	view.on('init', function (next) {
		var q = NewsPost.paginate({
			page    : req.query.page || 1,
			perPage : 6,
			maxPages: 10,
		})
		.where('state', 'published')
		.sort('-publishedDate')
		.populate('author');

		q.exec(function (err, results) {
			locals.news = results;
			next(err);
		});
	});
	view.render('index');
}
