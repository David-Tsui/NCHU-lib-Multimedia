var keystone = require('keystone');
var Types = keystone.Field.Types;

var AboutPost = new keystone.List('AboutPost', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '關於我們',
});

AboutPost.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'AboutPostCategory', many: true },
});

AboutPost.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

AboutPost.track = true;
AboutPost.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
AboutPost.register();
