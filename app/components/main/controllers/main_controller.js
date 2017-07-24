app.controller('mainController', ["$scope", "$http", "$location", "$timeout", "$mdUtil", "$mdSidenav", "$log", "$element", function ($scope, $http, $location, $timeout, $mdUtil, $mdSidenav, $log, $element) {
	
	$scope.toggleLeft = buildToggler('left');
	$scope.toggleRight = buildToggler('right');
	$scope.lockLeft = true;
	
	/**
	 * Build handler to open/close a SideNav; when animation finishes
	 * report completion in console
	 */
	function buildToggler(navID) {
		var debounceFn = $mdUtil.debounce(function () {
			$mdSidenav(navID)
				.toggle()
				.then(function () {
					$log.debug("toggle " + navID + " is done");
				});
		}, 300);
		
		return debounceFn;
	}
	
	$scope.openRightMenu = function () {
		$mdSidenav('right').toggle();
	};
	
	$scope.openLeftMenu = function () {
		$mdSidenav('left').toggle();
	};
	
	/**
	 *
	 * @type {{model: null, availableOptions: [*]}}
	 */
	$scope.menuOptions = {
		model: null,
		availableOptions: [
			{id: '1', name: 'Option A'},
			{id: '2', name: 'Option B'},
			{id: '3', name: 'Option C'}
		]
	};
	
	/**
	 *
	 * @returns {*}
	 */
	$scope.getDefault = function () {
		if ($scope.menuOptions.model !== null) {
			return $scope.menuOptions.model;
		} else {
			return "Create New ";
		}
	};
	
}]);

/**
 *
 */

app.controller('navigationLeftCtrl', ["$scope", "$timeout", "$mdSidenav", "$log", function ($scope, $timeout, $mdSidenav, $log) {
	$scope.leftClose = function () {
		// Component lookup should always be available since we are not using `ng-if`
		$mdSidenav('left').close()
			.then(function (e) {
				console.log(e);
				$log.debug("close LEFT is done");
			});
		
		console.log('close right is done');
	};
}]);

/**
 *
 */

app.controller('navigationRightCtrl', ["$scope", "$timeout", "$mdSidenav", "$log", function ($scope, $timeout, $mdSidenav, $log) {
	
	$scope.rightClose = function () {
		// Component lookup should always be available since we are not using `ng-if`
		$mdSidenav('right').close()
			.then(function () {
				$log.debug("close LEFT is done");
			});
		
	};
}]);


