app.controller('dashboardController', ["$scope", "$state", "$mdSidenav", "$timeout", "tasksFactory", "percentageConversionsFactory", function ($scope, $state, $mdSidenav, $timeout, tasksFactory, percentageConversionsFactory) {
	
	/**
	 *  User Tasks
	 * @type {Array}
	 */
	$scope.userTasks = [];
	$scope.randomUserTasks = [];
	
	/**
	 * Completed Tasks
	 * @type {number}
	 */
	$scope.completedTasksSize = 140;
	$scope.completedTasksValue = 0;
	$scope.completedTasksGradient = ["#349c86", "#51d2b7"];
	$scope.completedTasksID = "completed-tasks";
	
	/**
	 * Pending Tasks
	 * @type {number}
	 */
	//
	$scope.pendingTasksSize = 140;
	$scope.pendingTasksValue = 0;
	$scope.pendingTasksGradient = ["orange", "yellow"];
	$scope.pendingTasksID = "pending-tasks";
	
	/**
	 * Remaining Tasks Placeholders
	 * @type {number}
	 */
	
	$scope.remainingTasksSize = 140;
	$scope.remainingTasksValue = 0;
	$scope.remainingTasksGradient = ["#428bca", "aqua"];
	$scope.remainingTasksID = "remaining-tasks-placeholder";
	
	/**
	 * Currrent Tasks Placeholders
	 * @type {number}
	 */
	$scope.currentTasksSize = 140;
	$scope.currentTasksValue = 0;
	$scope.currentTasksGradient = ["red", "orange"];
	$scope.currentTasksID = "current-tasks-placeholder";
	
	$scope.initDashboard = function () {
		
		$timeout(function () {
			
			tasksFactory.getTasks(function (user_tasks) {
				
				$scope.userTasks = user_tasks;
				$scope.completedTasksValue = 0.001;
				$scope.pendingTasksValue = 0.001;
				$scope.currentTasksValue = 0.001;
				$scope.remainingTasksValue = 0.001;
				
				/**
				 *  Get random tasks
				 */
				tasksFactory.getCurrentTasks(function (current_task_data) {
					/**
					 * Set random tasks
					 */
					$scope.randomUserTasks = current_task_data;
					/**
					 *  Get completed and pending tasks values
					 */
					$scope.updateTaskValues();
				});

			});
			
		}, 200);
		
	};
	
	$scope.completeTask = function (task) {
		tasksFactory.updateTasks(task, function () {
			/**
			 *  Get completed and pending tasks values
			 */
			$scope.updateTaskValues();
		});
	};
	
	$scope.updateTaskValues = function () {
		/**
		 *  Get completed tasks
		 */
		tasksFactory.getCompletedTasks(function (completed_task_data) {
			$scope.completedTasksValue = percentageConversionsFactory.convertCircleProgressPercentage(completed_task_data.length, $scope.userTasks.length);
			
		});
		/**
		 *  Get pending tasks
		 */
		tasksFactory.getPendingTasks(function (pending_task_data) {
			
			$scope.pendingTasksValue = percentageConversionsFactory.convertCircleProgressPercentage(pending_task_data.length, $scope.userTasks.length);
		});
	};
	
}]);



