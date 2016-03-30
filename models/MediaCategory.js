var keystone = require('keystone');
var Types = keystone.Field.Types;

var MediaCategory = new keystone.List('MediaCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Categories',
});

MediaCategory.add({
	name: { type: String, required: true },
});

MediaCategory.relationship({ ref: 'Media', refPath: 'categories' });

MediaCategory.track = true;
MediaCategory.register();
