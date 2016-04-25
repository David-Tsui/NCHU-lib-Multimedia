var keystone = require('keystone');
var Types = keystone.Field.Types;

var MovieClassificationCategory = new keystone.List('MovieClassificationCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '以級別分類',
});

MovieClassificationCategory.add({
	name: { type: String, required: true },
	categories: { type: Types.Relationship, ref: 'MovieRootCategory', many: false },
});

MovieClassificationCategory.relationship({ ref: 'Movie', refPath: 'classification_categories' });

MovieClassificationCategory.track = true;
MovieClassificationCategory.register();
