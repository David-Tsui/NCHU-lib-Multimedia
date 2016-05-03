var keystone = require('keystone');
var Types = keystone.Field.Types;

var MovieAssignmentCategory = new keystone.List('MovieAssignmentCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '教師指定教材',
});

MovieAssignmentCategory.add({
	name: { type: String, required: true },
	categories: { type: Types.Relationship, ref: 'MovieRootCategory'},
});

MovieAssignmentCategory.relationship({ ref: 'Movie', refPath: 'assignment_category' });

MovieAssignmentCategory.track = true;
MovieAssignmentCategory.register();
