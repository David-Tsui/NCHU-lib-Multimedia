var keystone = require('keystone');
var Types = keystone.Field.Types;

var MovieCategory = new keystone.List('MovieCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Categories',
});

MovieCategory.add({
	name: { type: String, required: true },
});

MovieCategory.relationship({ ref: 'Movie', refPath: 'categories' });

MovieCategory.track = true;
MovieCategory.register();
