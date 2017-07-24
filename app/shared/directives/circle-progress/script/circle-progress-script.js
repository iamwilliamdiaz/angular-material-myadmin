app.directive('circleProgress', function () {
	return {
		templateUrl: 'app/shared/directives/circle-progress/template/circle-directive-template.html',
		restrict: 'E',
		scope: {
			circleId: '=', /* (= , @ or &) */
			circleSize: '=',
			circleValue: '=',
			circleGradient: '=',
			circleCallback: '&' /* In case you want to return a callback to the controller */
		},
		controller: function ($scope) {
			
			$scope.$watch('circleValue', function(newValue) {
				if (newValue){
					$('#' + $scope.circleId).circleProgress({
						value: $scope.circleValue,
						size: $scope.circleSize,
						fill: {
							gradient: $scope.circleGradient
						}
					}).on('circle-animation-progress', function(event, progress, stepValue) {
						$(this).find('strong').html(Math.round((stepValue * 100) * progress) + '<i>%</i>');
					});
					
				}
			}, true);
			
		}
	};
	
});
