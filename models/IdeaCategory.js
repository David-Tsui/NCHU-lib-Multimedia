var keystone = require('keystone');
var Types = keystone.Field.Types;

var IdeaCategory = new keystone.List('IdeaCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Categories',
});

IdeaCategory.add({
	name: { type: String, required: true },
});

IdeaCategory.relationship({ ref: 'Idea', refPath: 'categories' });

IdeaCategory.track = true;
IdeaCategory.register();
