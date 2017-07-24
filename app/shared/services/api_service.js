app.factory('apiService', function ($http) {
	
	return {
		getService: function (url, query, callback) {
			var query_string = null;
			angular.forEach(query, function (value, key) {
				if (!query_string) {
					query_string = key + '=' + value;
				} else {
					query_string = query_string + '&' + key + '=' + value;
				}
			});
			var promise = $http.get(url + '?' + query_string, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			promise.then(
				function (payload) {
					callback(payload);
				}, function (error) {
					callback(error);
				});
		},
		postService: function (data, url, callback) {
			var promise = $http.post(apiConfig.apiUrl + url, data, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			promise.then(
				function (payload) {
					callback(payload);
				}, function (error) {
					callback(error);
				});
		},
		putService: function (data, url, callback) {
			var promise = $http.put(apiConfig.apiUrl + url, data, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			promise.then(
				function (payload) {
					callback(payload);
				}, function (error) {
					callback(error);
				});
		},
		deleteService: function (data, url, callback) {
			var promise = $http.delete(apiConfig.apiUrl + url, data, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			promise.then(
				function (payload) {
					callback(payload);
				}, function (error) {
					callback(error);
				});
		}
	};
});
