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
	'chartbeat domain': process.env.CHARTBEAT_DOMAIN,
	'wysiwyg override toolbar': false,
	'wysiwyg menubar': true,
	'wysiwyg skin': 'lightgray',
	'wysiwyg additional buttons': 'searchreplace visualchars,'
	 + ' charmap ltr rtl pagebreak paste, forecolor backcolor,'
	 +' emoticons media, preview print, image imagetools',
	'wysiwyg additional plugins': 'table, anchor,'
	 + ' autolink, autosave, charmap, contextmenu, '
	 + ' directionality, emoticons, fullpage, hr, media, pagebreak,'
	 + ' paste, preview, print, searchreplace, textcolor,'
	 + ' visualblocks, visualchars, image imagetools'
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
	// '歷史訊息': ['histories', 'history-categories'],
	'多媒體中心': ['news-posts', 'news-post-categories'],
	'愛創聯盟': ['maker-posts', 'maker-post-categories'],
	'網路資源': ['resources-posts', 'resources-post-categories'],
	'看電影': ['movie-posts', 'movie-post-categories'],
	'玩創意': ['idea-posts', 'idea-post-categories'],
	'影音物件': ['movies', 'movie-root-categories', 'movie-region-categories', 'movie-theme-categories', 'movie-classification-categories', 'movie-new-categories', 'movie-topic-categories', 'movie-assignment-categories', 'movie-hot-categories'],
	// '所有文章': ['posts', 'post-comments', 'post-categories'],
	'管理員': 'users'
});

keystone.start();
