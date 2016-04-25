var keystone = require('keystone');
var Types = keystone.Field.Types;

var MovieThemeCategory = new keystone.List('MovieThemeCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '以主題分類',
});

MovieThemeCategory.add({
	name: { type: String, required: true },
	categories: { type: Types.Relationship, ref: 'MovieRootCategory', many: false },
});

MovieThemeCategory.relationship({ ref: 'Movie', refPath: 'theme_categories' });

MovieThemeCategory.track = true;
MovieThemeCategory.register();
