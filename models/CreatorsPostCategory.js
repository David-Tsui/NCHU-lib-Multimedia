var keystone = require('keystone');
var Types = keystone.Field.Types;

var CreatorsPostCategory = new keystone.List('CreatorsPostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '分類',
});

CreatorsPostCategory.add({
	name: { type: String, required: true },
});

CreatorsPostCategory.relationship({ ref: 'CreatorsPost', refPath: 'categories' });

CreatorsPostCategory.track = true;
CreatorsPostCategory.register();
