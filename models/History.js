var keystone = require('keystone');
var Types = keystone.Field.Types;

var History = new keystone.List('History', {
	autokey: { from: 'name', path: 'key', unique: true },
});

History.add({
	name: { type: String, required: true },
	english_name: { type: String },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	director: { type: String },
	actor: { type: Types.Html, wysiwyg: true, height: 150 },
	link: { type: String },
	classfication: { type: Types.Select, options: '普遍級, 保護級, 輔導級, 限制級' },
	videoTime: { type: String },
	inDate: { type: Types.Date },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 500 },
	},
	categories: { type: Types.Relationship, ref: 'HistoryCategory', many: true },
});

History.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

// History.relationship({ path: 'comments', ref: 'HistoryComment', refPath: 'post' });

History.track = true;
History.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
History.register();
