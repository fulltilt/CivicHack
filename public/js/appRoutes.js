(function() {
	angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

		$routeProvider
			// home page
			.when('/', {
				templateUrl: '/partials/posts.html'
			})

			//.when('/login', {
			//	templateUrl: '/views/login.html'
			//})

			.when('/profile', {
				templateUrl: '/partials/profile.html'
			})

			.when('/post/new', {
				templateUrl: '/partials/edit-post.html'
			})

			.when('/post/:id', {
				templateUrl: '/partials/post.html'  // if I don't have the leading '/', page gets stuck in infinite loop (http://stackoverflow.com/questions/21356671/angular-route-infinite-loop)
			})

			.when('/post/edit/:id', {
				templateUrl: '/partials/edit-post.html'
			})

			.otherwise({redirectTo: '/'});

		$locationProvider.html5Mode(true);

	}]);
})();