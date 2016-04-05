var keystone = require('keystone');
var Types = keystone.Field.Types;

var ResourcesPost = new keystone.List('ResourcesPost', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ResourcesPost.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'ResourcesPostCategory', many: true },
});

ResourcesPost.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

ResourcesPost.track = true;
ResourcesPost.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
ResourcesPost.register();
