var keystone = require('keystone');

exports.options = {
	'name' : '管理者介面',
	'brand': '管理者介面',

	'favicon': 'public/favicon.ico',
	'less'   : 'public',
	'static' : 'public',

	'views'      : 'templates/views',
	'view engine': 'jade',


	'mongo': process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/nchu-lib',
	
	'cloudinary config': 'cloudinary://723239137287229:-_LsiFvvJIExNQv6FWakiPiLSAA@nchu-lib',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'demo',

	'wysiwyg override toolbar': false,
	'wysiwyg menubar'         : true,
	'wysiwyg skin'            : 'lightgray',
	'wysiwyg additional buttons': 'styleselect undo redo | fontsizeselect | searchreplace visualchars,'
	 + ' charmap ltr rtl pagebreak paste, forecolor backcolor,'
	 +' emoticons media, image imagetools, preview print',
	'wysiwyg fontsize_formats'  : '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
	'wysiwyg additional plugins': 'table, anchor,'
	 + ' autolink, autosave, charmap, contextmenu, '
	 + ' directionality, emoticons, fullpage, hr, media, pagebreak,'
	 + ' paste, preview, print, searchreplace, textcolor,'
	 + ' visualblocks, visualchars, image imagetools'
	// 'cookie secret': '&#34;fF-ELbvoJ|P6:$&lt;;3c-Cen8OJJy[W1&amp;i@O.M)-%&lt;&gt;QTiTvC93&lt;n;R@!vD@A6N=7',

};

exports.locals = {
	_          : require('lodash'),
	env        : process.env.NODE_ENV,
	ga_property: process.env.GA_PROPERTY,
	ga_domain  : process.env.GA_DOMAIN,
	utils      : keystone.utils,
	editable   : keystone.content.editable,
};

exports.nav = {
	'最新消息'  : ['news-posts'],
	'中心介紹'  : ['intro-posts'],
	'關於我們'  : ['about-posts', 'about-post-categories'],
	'愛創聯盟'  : ['creators-posts', 'creators-post-categories'],
	// '暫存'    	 : ['maker-posts', 'maker-post-categories'],
	'網路資源'  : ['resources-posts', 'resources-post-categories'],
	// '看電影': ['movie-posts', 'movie-post-categories'],
	'玩創意'   : ['idea-posts', 'idea-post-categories'],
	'影音物件' : [
		'movies', 'movie-root-categories',
		'movie-region-categories', 'movie-theme-categories', 'movie-classification-categories',
		'movie-new-categories', 'movie-topic-categories', 'movie-assignment-categories', 'movie-hot-categories'
	],
	'管理員'  : 'users'
};
