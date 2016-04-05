var keystone = require('keystone');
var Types = keystone.Field.Types;

var MakerPostCategory = new keystone.List('MakerPostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Categories',
});

MakerPostCategory.add({
	name: { type: String, required: true },
});

MakerPostCategory.relationship({ ref: 'MakerPost', refPath: 'categories' });

MakerPostCategory.track = true;
MakerPostCategory.register();
