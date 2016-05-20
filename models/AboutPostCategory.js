var keystone = require('keystone');
var Types = keystone.Field.Types;

var AboutPostCategory = new keystone.List('AboutPostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '分類',
});

AboutPostCategory.add({
	name: { type: String, required: true },
});

AboutPostCategory.relationship({ ref: 'AboutPost', refPath: 'categories' });

AboutPostCategory.track = true;
AboutPostCategory.register();