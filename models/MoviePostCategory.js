var keystone = require('keystone');
var Types = keystone.Field.Types;

var MoviePostCategory = new keystone.List('MoviePostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Categories',
});

MoviePostCategory.add({
	name: { type: String, required: true },
});

MoviePostCategory.relationship({ ref: 'MoviePost', refPath: 'categories' });

MoviePostCategory.track = true;
MoviePostCategory.register();
