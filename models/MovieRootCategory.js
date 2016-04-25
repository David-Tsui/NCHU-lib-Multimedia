var keystone = require('keystone');
var Types = keystone.Field.Types;

var MovieRootCategory = new keystone.List('MovieRootCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '主要分類',
});

MovieRootCategory.add({
	name: { type: String, required: true },
	// categories: { type: Types.Relationship },
});

// MovieRootCategory.relationship({ ref: 'MovieRegionCategory', refPath: 'categories' });
MovieRootCategory.relationship(
	{ ref: 'MovieRegionCategory', refPath: 'categories' }
);
MovieRootCategory.relationship(
	{ ref: 'MovieThemeCategory', refPath: 'categories' }
);
MovieRootCategory.relationship(
	{ ref: 'MovieClassificationCategory', refPath: 'categories' }
);

MovieRootCategory.track = true;
MovieRootCategory.register();
