var keystone = require('keystone');
var Types = keystone.Field.Types;

var MoviePost = new keystone.List('MoviePost', {
	autokey: { from: 'name', path: 'key', unique: true },
});

MoviePost.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'MoviePostCategory', many: true },
});

MoviePost.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

MoviePost.track = true;
MoviePost.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
MoviePost.register();
