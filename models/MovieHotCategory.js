var keystone = require('keystone');
var Types = keystone.Field.Types;

var MovieHotCategory = new keystone.List('MovieHotCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '熱門影音',
});

MovieHotCategory.add({
	name: { type: String, required: true },
	categories: { type: Types.Relationship, ref: 'MovieRootCategory'},
});

MovieHotCategory.relationship({ ref: 'Movie', refPath: 'hot_category' });

MovieHotCategory.track = true;
MovieHotCategory.register();
