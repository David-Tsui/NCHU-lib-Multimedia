var keystone = require('keystone');
var Types = keystone.Field.Types;

var CreatorsPost = new keystone.List('CreatorsPost', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '文章',
});

CreatorsPost.add({
	name         : { type: String, required: true },
	state        : { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author       : { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	image        : { type: Types.CloudinaryImage },
	content      : {
		brief   : { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'CreatorsPostCategory', many: true },
});

CreatorsPost.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

CreatorsPost.track = true;
CreatorsPost.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
CreatorsPost.register();
