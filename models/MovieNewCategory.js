var keystone = require('keystone');
var Types = keystone.Field.Types;

var MovieNewCategory = new keystone.List('MovieNewCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '新進影音',
});

MovieNewCategory.add({
	name      : { type: String, required: true },
	startDate : { type: Types.Date, index: true }
});

MovieNewCategory.relationship({ ref: 'Movie', refPath: 'new_category' });

MovieNewCategory.track = true;
MovieNewCategory.defaultColumns = 'name, startDate|20%';
MovieNewCategory.register();
