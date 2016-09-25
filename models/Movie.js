var keystone = require('keystone');
var Types = keystone.Field.Types;

var Movie = new keystone.List('Movie', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '單一影音',
});

Movie.add({
	name         : { type: String, required: true },
	english_name : { type: String },
	state        : { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author       : { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	image        : { type: Types.CloudinaryImage },
	director     : { type: String },
	actor        : { type: Types.Html, wysiwyg: true, height: 150 },
	link         : { type: String },
	videoTime    : { type: String },
	inDate       : { type: Types.Date },
	content      : {
		brief   : { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 500 },
	},
	// 地區
	region_categories        : { 
		type: Types.Relationship,
		ref : 'MovieRegionCategory'
	},
	// 主題分類
	theme_categories         : {
		type: Types.Relationship,
		ref : 'MovieThemeCategory',
		many: true
	},
	// 觀賞級別
	classification_categories: {
		type: Types.Relationship,
		ref : 'MovieClassificationCategory',
		many: true
	},
	// 主題影展
	topic_category           : {
		type: Types.Relationship,
		ref : 'MovieTopicCategory',
		many: true
	},
	// 教師指定
	assignment_category      : {
		type: Types.Relationship,
		ref : 'MovieAssignmentCategory',
		many: true
	},
	// 熱門影展
	hot_category             : {
		type: Types.Relationship,
		ref : 'MovieHotCategory',
		many: true
	},
	// 新進影音
	new_category             : {
		type: Types.Relationship,
		ref : 'MovieNewCategory'
	}
});

Movie.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

// Movie.relationship({ path: 'comments', ref: 'MovieComment', refPath: 'post' });

Movie.track = true;
Movie.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
Movie.register();
