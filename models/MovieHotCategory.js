var keystone = require('keystone');
var Types = keystone.Field.Types;

var MovieHotCategory = new keystone.List('MovieHotCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '熱門影音',
});

MovieHotCategory.add({
	name     : { type: String, required: true },
	state    : { type: Types.Select, options: '發布中, 未發布', default: '發布中', index: true},
	startDate: { type: Types.Date, index: true }
});

MovieHotCategory.relationship({ ref: 'Movie', refPath: 'hot_category' });

MovieHotCategory.track = true;
MovieHotCategory.defaultColumns = 'name, state, startDate|20%';
MovieHotCategory.register();
