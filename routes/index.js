const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', function (req, res, next) {
	res.locals.navLinks = [
		{
			label: "最新消息",
			key: "index",
			href: "/",
			nested: false
		},
		{ 
			label: "關於我們",
			key: "about", 
			href: "/about",
			nested: true,
			subnav: [
				{
					label: "中心介紹",
					key: "intro",
					href: "/about/intro"
				},
				{
					label: "相關規則",
					key: "rules",
					href: "/about/rules"
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
					href: "http://www.lib.nchu.edu.tw/News/blog.lib.nchu.edu.tw/media_old/"
				}
			]
		},
		{ 
			label: "玩創意",
			key: "ideas",
			href: "/ideas",
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
	app.get('/news/posts/:post', routes.views.news);
	app.get('/about/:category', routes.views.about);
	app.get('/makers/:type', routes.views.maker);
	app.get('/resources/:type', routes.views.resources);
	app.get('/idea/:type', routes.views.idea);

	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
	app.get('/movies/movie_blog/movie/:movie', routes.views.movie);
	app.get('/movies/movie_blog/:root_category?/:category?', routes.views.movie_blog);

	app.get('/movies/new/:month?', routes.views.movie_news_monthly);
	app.get('/movies/topic/:topic_category?', routes.views.movie_cate_generator(keystone.list('MovieTopicCategory'), 'topic_category', 'topic', '主題影展'));
	app.get('/movies/assignment/:assignment_category?', routes.views.movie_cate_generator(keystone.list('MovieAssignmentCategory'), 'assignment_category', 'assignment', '教師指定教材'));
	app.get('/movies/hot/:hot_category?', routes.views.movie_cate_generator(keystone.list('MovieHotCategory'), 'hot_category', 'hot', '熱門影音排行榜'));
	
	app.get('/', routes.views.index);
	app.get('/:haha?', routes.views.index);
}
