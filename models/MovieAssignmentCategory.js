var keystone = require('keystone');
var Types = keystone.Field.Types;

var MovieAssignmentCategory = new keystone.List('MovieAssignmentCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '教師指定教材',
});

MovieAssignmentCategory.add({
	name         : { type: String, required: true },
	state        : { type: Types.Select, options: '發布中, 未發布', default: '發布中', index: true},
	courseName   : { type: String },
	professorName: { type: String }
});

MovieAssignmentCategory.relationship({ ref: 'Movie', refPath: 'assignment_category' });

MovieAssignmentCategory.track = true;
MovieAssignmentCategory.defaultColumns = 'name, state, courseName, professorName|20%';
MovieAssignmentCategory.register();
