var keystone = require('keystone');
var Types = keystone.Field.Types;

var MakerCategory = new keystone.List('MakerCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Categories',
});

MakerCategory.add({
	name: { type: String, required: true },
});

MakerCategory.relationship({ ref: 'Maker', refPath: 'categories' });

MakerCategory.track = true;
MakerCategory.register();
