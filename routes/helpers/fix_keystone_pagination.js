exports = module.exports = function fix_keystone_pagination(keystone_query_result, counts, per_page) {
	keystone_query_result.total = counts;
	if (keystone_query_result.total > 0) {
		if ((keystone_query_result.total % per_page) == 0) {
			keystone_query_result.totalPages = keystone_query_result.total / per_page;
		}	else if (keystone_query_result.total > per_page) {
			keystone_query_result.totalPages = keystone_query_result.total / per_page + 1;
		} else if (keystone_query_result.total < per_page) {
			keystone_query_result.totalPages = 1;
		}
	}
	keystone_query_result.pages = [];
	for(var i = 1; i <= keystone_query_result.totalPages; i++) {
		keystone_query_result.pages.push(i);
	}
	return keystone_query_result;
};

