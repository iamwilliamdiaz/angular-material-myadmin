app.factory('tasksFactory', ["$http", "apiService", "$localstorage", function ($http, apiService, $localstorage) {
	
	/**
	 *  Array Vars
	 * @type {Array}
	 */
	var userTasks = [];
	var currentTasks = [];
	var completedTasks = [];
	var pendingTasks = [];
	var taskIndex = 0;
	
	return {
		getTasks: function (callback) {
			userTasks = $localstorage.get('user-tasks');
			if (typeof userTasks !== 'undefined') {
				userTasks = JSON.parse(userTasks.toString());
				return callback(userTasks);
			} else {
				apiService.getService('app/sample_data/tasks.json', '', function (api_response) {
					if (api_response.status === 200) {
						userTasks = api_response.data;
						$localstorage.set('user-tasks', JSON.stringify(userTasks));
						console.log(userTasks);
						return callback(userTasks);
					} else {
						return callback(userTasks);
					}
				});
			}
		},
		getCurrentTasks: function (callback) {
			if (userTasks) {
				Array.prototype.shuffled = function () {
					return this.map(function (n) { return [Math.random(), n]; })
						.sort().map(function (n) { return n[1]; });
				};
				angular.forEach(userTasks.shuffled(), function (task) {
					currentTasks.push(task);
				});
				return callback(currentTasks.slice(0, 6));
			} else {
				return callback(userTasks);
			}
		},
		getCompletedTasks: function (callback) {
			if (userTasks) {
				completedTasks = [];
				angular.forEach(userTasks, function (task) {
					if (task.completed === "true") {
						completedTasks.push(task);
					}
				});
				return callback(completedTasks);
			} else {
				return callback(userTasks);
			}
		},
		getPendingTasks: function (callback) {
			if (userTasks) {
				pendingTasks = [];
				angular.forEach(userTasks, function (task) {
					if (task.completed === "false") {
						pendingTasks.push(task);
					}
				});
				return callback(pendingTasks);
			} else {
				return callback(userTasks);
			}
		},
		updateTasks: function (task, callback) {
			if (userTasks) {
				taskIndex = (task.id - 1);
				userTasks[taskIndex.toString()].completed = "true";
				$localstorage.set('user-tasks', JSON.stringify(userTasks));
			}
			return callback();
		}
	};
	
}]);


