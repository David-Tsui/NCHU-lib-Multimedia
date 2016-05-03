var keystone = require('keystone');
var Types = keystone.Field.Types;

var MovieTopicCategory = new keystone.List('MovieTopicCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '主題影展',
});

MovieTopicCategory.add({
	name: { type: String, required: true },
	categories: { type: Types.Relationship, ref: 'MovieRootCategory'},
});

MovieTopicCategory.relationship({ ref: 'Movie', refPath: 'topic_category' });

MovieTopicCategory.track = true;
MovieTopicCategory.register();
