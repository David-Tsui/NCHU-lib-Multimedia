var keystone = require('keystone');
var Types = keystone.Field.Types;

var IdeaPostCategory = new keystone.List('IdeaPostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '分類',
});

IdeaPostCategory.add({
	name: { type: String, required: true },
});

IdeaPostCategory.relationship({ ref: 'IdeaPost', refPath: 'categories' });

IdeaPostCategory.track = true;
IdeaPostCategory.register();
