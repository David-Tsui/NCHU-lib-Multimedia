var keystone = require('keystone');
var Types = keystone.Field.Types;

var MovieRegionCategory = new keystone.List('MovieRegionCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '以地區分類',
});

MovieRegionCategory.add({
	name: { type: String, required: true },
	categories: { type: Types.Relationship, ref: 'MovieRootCategory', many: false },
});

MovieRegionCategory.relationship({ ref: 'Movie', refPath: 'region_categories' });

MovieRegionCategory.track = true;
MovieRegionCategory.register();
