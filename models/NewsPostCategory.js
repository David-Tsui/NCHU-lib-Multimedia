var keystone = require('keystone');
var Types = keystone.Field.Types;

var NewsPostCategory = new keystone.List('NewsPostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '分類',
});

NewsPostCategory.add({
	name: { type: String, required: true },
});

NewsPostCategory.relationship({ ref: 'NewsPost', refPath: 'categories' });

NewsPostCategory.track = true;
NewsPostCategory.register();