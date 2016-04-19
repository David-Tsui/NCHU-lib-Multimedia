var keystone = require('keystone');
var Types = keystone.Field.Types;

var HistoryCategory = new keystone.List('HistoryCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Categories',
});

HistoryCategory.add({
	name: { type: String, required: true },
});

HistoryCategory.relationship({ ref: 'History', refPath: 'categories' });

HistoryCategory.track = true;
HistoryCategory.register();
