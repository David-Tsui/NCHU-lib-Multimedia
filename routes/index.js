const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', function (req, res, next) {
	res.locals.navLinks = [
		{ 
			label: "首頁",
			key: "root", 
			href: "/",
			nested: false
		},
		{
			label: "最新消息",
			key: "news",
			href: "/news",
			nested: false
		},
		{ 
			label: "關於本中心",
			key: "media_center", 
			href: "/",
			nested: true,
			subnav: [
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
					label: "聯盟介紹",
					key: "news",
					href: "/makers/intro"
				},
				{
					label: "聯盟成員",
					key: "intro",
					href: "/makers/organization"
				},
				{
					label: "課程一覽",
					key: "rules",
					href: "/makers/curriculums"
				},
				{
					label: "活動一覽",
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
					href: "/resources/Mac_app"
				},
				{
					label: "免費圖片資源",
					key: "intro",
					href: "/resources/free_figures"
				},
				{
					label: "免費廣播資源",
					key: "rules",
					href: "/resources/free_broadcast"
				},
				{
					label: "電腦軟體課程",
					key: "rules",
					href: "/resources/software_curriculums"
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
					href: "/movies/movie_blog/"
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
			href: "/idea",
			nested: true,
			subnav: [
				{
					label: "玩桌遊",
					key: "test1",
					href: "/idea/table_game"
				},
				{
					label: "Line貼圖徵選活動",
					key: "test2",
					href: "/idea/Line_stickers"
				}
			]
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
	app.get('/news/post/:post', routes.views.news_detail);
	app.get('/makers/:type', routes.views.maker);
	app.get('/resources/:type', routes.views.resources);
	app.get('/idea/:type', routes.views.idea);

	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
	app.get('/movies/movie_blog/movie/:movie', routes.views.movie);
	app.get('/movies/movie_blog/:root_category?/:category?', routes.views.movie_blog);
	// app.get('/movies/movie_blog/region/:category?', routes.views.movie_blog);
	// app.get('/movies/movie_blog/theme/:category?', routes.views.movie_blog);
	// app.get('/movies/movie_blog/classification/:category?', routes.views.movie_blog);

	app.get('/:category', routes.views.news);
	app.get('/', routes.views.index);
	// app.get('/movie_blog/:category?', routes.views.movie_blog);
	// app.get('/movie_blog/movie/:movie', routes.views.movie);

	// Downloads
	app.get('/download/users', routes.download.users);

}
