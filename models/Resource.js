var keystone = require('keystone');
var Types = keystone.Field.Types;

var Resource = new keystone.List('Resource', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Resource.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'ResourceCategory', many: true },
});

Resource.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Resource.track = true;
Resource.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
Resource.register();
