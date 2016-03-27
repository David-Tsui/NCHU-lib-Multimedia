const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', function (req, res, next) {
	res.locals.navLinks = [
		{ 
			label: "多媒體中心",
			key: "home", 
			href: "/",
			nested: true,
			subnav: [
				{
					label: "最新消息",
					key: "news",
					href: "/news"
				},
				{
					label: "中心介紹",
					key: "intro",
					href: "/intro"
				},
				{
					label: "相關規則",
					key: "rules",
					href: "/rules"
				}
			]
		},
		{ 
			label: "愛創聯盟",
			key: "maker", 
			href: "/makers",
			nested: true,
			subnav: [
				{
					label: "愛創者聯盟簡介",
					key: "news",
					href: "/makers/intro"
				},
				{
					label: "愛創者聯盟人員",
					key: "intro",
					href: "/makers/organization"
				},
				{
					label: "愛創者課程",
					key: "rules",
					href: "/makers/curriculums"
				},
				{
					label: "愛創者活動",
					key: "rules",
					href: "/makers/activities"
				}
			]
		},
		{ 
			label: "網路資源",
			key: "resources", 
			href: "/resources",
			nested: true,
			subnav: [
				{
					label: "Mac應用資源",
					key: "news",
					href: "/resources/mac-app"
				},
				{
					label: "免費圖片資源",
					key: "intro",
					href: "/resources/free-pics"
				},
				{
					label: "免費廣播資源",
					key: "rules",
					href: "/resources/free-broad"
				},
				{
					label: "電腦軟體課程",
					key: "rules",
					href: "/resources/software-class"
				},
				{
					label: "TED(倒了)",
					key: "ted",
					href: "/resources/TED"
				}
			]
		},
		{ 
			label: "看電影",
			key: "movies", 
			href: "/movies",
			nested: true,
			subnav: [
				{
					label: "新進影音",
					key: "mv_new",
					href: "/movies/new"
				},
				{
					label: "主題影展",
					key: "mv_topic",
					href: "/movies/topic"
				},
				{
					label: "教師指定教材",
					key: "mv_assignment",
					href: "/movies/assignment"
				},
				{
					label: "熱門影音排行榜",
					key: "mv_hot",
					href: "/movies/hot"
				},
				{
					label: "影片分類",
					key: "mv_category",
					href: "/movies/category"
				},
				{
					label: "舊視聽館藏搶先報",
					key: "mv_old",
					href: "/movies/old-collection"
				}
			]
		},
		{ 
			label: "玩創意",
			key: "test0",
			href: "#",
			nested: true,
			subnav: [
				{
					label: "玩桌遊",
					key: "test1",
					href: "/idea/board-games"
				},
				{
					label: "Line貼圖徵選活動",
					key: "test2",
					href: "/idea/board-games"
				}
			]
		},
		{
			label: "Blog",
			key: "blog",
			href: "/blog",
			nested: false
		},
		{ 
			label: "Movie",
			key: "movie_blog",
			href: "/movie_blog",
			nested: false
		}
	];
	res.locals.user = req.user;
	next();
});

keystone.pre('render', middleware.theme);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
	res.status(404).render('errors/404');
});

// Load Routes
var routes = {
	download: importRoutes('./download'),
	views: importRoutes('./views'),
};

exports = module.exports = function (app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
	app.get('/movie_blog/:category?', routes.views.movie_blog);
	app.get('/movie_blog/movie/:movie', routes.views.movie);
	// app.get('/gallery', routes.views.gallery);
	// app.all('/contact', routes.views.contact);

	// Downloads
	app.get('/download/users', routes.download.users);

}
