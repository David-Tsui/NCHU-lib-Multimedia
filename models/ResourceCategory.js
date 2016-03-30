var keystone = require('keystone');
var Types = keystone.Field.Types;

var ResourceCategory = new keystone.List('ResourceCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Categories',
});

ResourceCategory.add({
	name: { type: String, required: true },
});

ResourceCategory.relationship({ ref: 'Resource', refPath: 'categories' });

ResourceCategory.track = true;
ResourceCategory.register();
