var keystone = require('keystone');
var Types = keystone.Field.Types;

var Movie = new keystone.List('Movie', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Movie.add({
	name: { type: String, required: true },
	english_name: { type: String },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	director: { type: String },
	actor: { type: String },
	link: { type: String },
	classfication: { type: String },
	videoTime: { type: String },
	inDate: { type: Types.Date },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 200 },
		extended: { type: Types.Html, wysiwyg: true, height: 600 },
	},
	categories: { type: Types.Relationship, ref: 'MovieCategory', many: true },
});

Movie.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

// Movie.relationship({ path: 'comments', ref: 'MovieComment', refPath: 'post' });

Movie.track = true;
Movie.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
Movie.register();
