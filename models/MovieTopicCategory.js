var keystone = require('keystone');
var Types = keystone.Field.Types;

var MovieTopicCategory = new keystone.List('MovieTopicCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '主題影展',
});

MovieTopicCategory.add({
	name     : { type: String, required: true },
	state    : { type: Types.Select, options: '進行中, 已結束', default: '進行中', index: true},
	startDate: { type: Types.Date, index: true }
});

MovieTopicCategory.relationship({ ref: 'Movie', refPath: 'topic_category' });

MovieTopicCategory.track = true;
MovieTopicCategory.defaultColumns = 'name, state, startDate|20%';
MovieTopicCategory.register();
