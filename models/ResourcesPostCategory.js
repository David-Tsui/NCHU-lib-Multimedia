var keystone = require('keystone');
var Types = keystone.Field.Types;

var ResourcesPostCategory = new keystone.List('ResourcesPostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Categories',
});

ResourcesPostCategory.add({
	name: { type: String, required: true },
});

ResourcesPostCategory.relationship({ ref: 'Resources', refPath: 'categories' });

ResourcesPostCategory.track = true;
ResourcesPostCategory.register();
