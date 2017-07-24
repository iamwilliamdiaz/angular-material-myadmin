app.config(function ($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/dashboard");
	
	$stateProvider
		
		.state('dashboard', {
			url: "/dashboard",
			title: 'Home',
			views: {
				"content_screen": {
					templateUrl: "app/components/dashboard/views/dashboard.html",
					controller: 'dashboardController'
				}
			}
			
		});
	
});