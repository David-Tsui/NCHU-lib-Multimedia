var keystone = require('keystone');

keystone.init({

	'name': '管理者介面',
	'brand': 'Admin',

	'favicon': 'public/favicon.ico',
	'less': 'public',
	'static': 'public',

	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'mongo': process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/nchu-lib',
	'cloudinary config': 'cloudinary://723239137287229:-_LsiFvvJIExNQv6FWakiPiLSAA@nchu-lib',

	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'demo',

	'ga property': process.env.GA_PROPERTY,
	'ga domain': process.env.GA_DOMAIN,

	'chartbeat property': process.env.CHARTBEAT_PROPERTY,
	'chartbeat domain': process.env.CHARTBEAT_DOMAIN

});

keystone.import('models');

keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
	ga_property: keystone.get('ga property'),
	ga_domain: keystone.get('ga domain'),
	chartbeat_property: keystone.get('chartbeat property'),
	chartbeat_domain: keystone.get('chartbeat domain')
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	'多媒體中心': ['media', 'media-categories'],
	'愛創聯盟': ['makers', 'maker-categories'],
	'網路資源': ['resources', 'resource-categories'],
	'看電影': ['movies', 'movie-categories'],
	'玩創意': ['ideas', 'idea-categories'],
	'所有文章': ['posts', 'post-comments', 'post-categories'],
	'管理員': 'users'
});

keystone.start();
