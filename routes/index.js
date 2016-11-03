const keystone     = require('keystone');
const middleware   = require('./middleware');
const importRoutes = keystone.importer(__dirname);
var NewsPost       = keystone.list('NewsPost');

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
			key: "creator", 
			href: "/creators",
			nested: true,
			subnav: [
				{
					label: "聯盟介紹",
					key: "creators_intro",
					href: "/creators/intro"
				},
				{
					label: "聯盟活動",
					key: "creators_activity",
					href: "/creators/activities"
				},
				{
					label: "主題演講",
					key: "creators_lecture",
					href: "/creators/lectures"
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
					key: "movie_new",
					href: "/movies/new"
				},
				{
					label: "影片總覽",
					key: "movie_category",
					href: "/movies/movie_blog/"
				},
				{
					label: "主題影展",
					key: "movie_topic",
					href: "/movies/topic"
				},
				{
					label: "教師指定教材",
					key: "movie_assignment",
					href: "/movies/assignment"
				},
				{
					label: "熱門影音排行榜",
					key: "movie_hot",
					href: "/movies/hot"
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
					key: "table_game",
					href: "/idea/table_game"
				},
				{
					label: "LINE貼圖",
					key: "line_stickers",
					href: "/idea/line_stickers"
				},
				{
					label: "加入圖書館line@",
					key: "join_line",
					href: "/idea/join_line"
				}
			]
		}
	];
	res.locals.user = req.user;
	next();
});

// keystone.pre('render', middleware.theme);
// keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
	res.status(404).render('errors/404');
});

// Load Routes
var routes = {
	// download: importRoutes('./download'),
	views: importRoutes('./views'),
};

exports = module.exports = function (app) {

	// Views
	// app.get('/news/list', routes.views.news_list);
	app.get('/news/posts/:post', routes.views.news_detail);
	app.get('/about/intro', routes.views.intro);
	app.get('/about/:category', routes.views.about);
	app.get('/creators/:category', routes.views.creators);
	app.get('/creators/:category/posts/:post', routes.views.creators_detail);
	app.get('/resources/:type', routes.views.resources);
	app.get('/idea/:category', routes.views.idea);
	app.get('/idea/:category/posts/:post', routes.views.idea_detail);

	app.get('/movies/movie_blog/movie/:movie', routes.views.movie);
	app.get('/movies/movie_blog/:root_category?/:category?', routes.views.movie_blog);

	app.get('/movies/new/:month?', routes.views.movie_news_monthly);
	app.get('/movies/topic/:topic_category?', routes.views.movie_cate_generator(keystone.list('MovieTopicCategory'), 'topic_category', 'topic', '主題影展'));
	app.get('/movies/assignment/:assignment_category?', routes.views.movie_cate_generator(keystone.list('MovieAssignmentCategory'), 'assignment_category', 'assignment', '教師指定教材'));
	app.get('/movies/hot/:hot_category?', routes.views.movie_cate_generator(keystone.list('MovieHotCategory'), 'hot_category', 'hot', '熱門影音排行榜'));
	
	app.get('/', routes.views.index);
	app.get('/:other', routes.views.index);
}
