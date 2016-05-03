var keystone = require('keystone');
var Types = keystone.Field.Types;

var Movie = new keystone.List('Movie', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '單一影音',
});

Movie.add({
	name: { type: String, required: true },
	english_name: { type: String },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	director: { type: String },
	actor: { type: Types.Html, wysiwyg: true, height: 150 },
	link: { type: String },
	// classification: { type: Types.Select, options: '普遍級, 保護級, 輔導級, 限制級' },
	videoTime: { type: String },
	inDate: { type: Types.Date },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 500 },
	},
	region_categories: { type: Types.Relationship, ref: 'MovieRegionCategory'},
	theme_categories: { type: Types.Relationship, ref: 'MovieThemeCategory', many: true },
	classification_categories: { type: Types.Relationship, ref: 'MovieClassificationCategory'},
	topic_category: { type: Types.Relationship, ref: 'MovieTopicCategory'},
	assignment_category: { type: Types.Relationship, ref: 'MovieAssignmentCategory'},
	hot_category: { type: Types.Relationship, ref: 'MovieHotCategory'},
	new_category: { type: Types.Relationship, ref: 'MovieNewCategory'},
});

Movie.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

// Movie.relationship({ path: 'comments', ref: 'MovieComment', refPath: 'post' });

Movie.track = true;
Movie.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
Movie.register();
