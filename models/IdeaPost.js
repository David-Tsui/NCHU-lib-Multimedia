var keystone = require('keystone');
var Types = keystone.Field.Types;

var IdeaPost = new keystone.List('IdeaPost', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '文章',
});

IdeaPost.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'IdeaPostCategory', many: true },
});

IdeaPost.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

IdeaPost.track = true;
IdeaPost.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
IdeaPost.register();
