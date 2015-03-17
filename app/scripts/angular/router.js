angular.module('routing', ['ui.router']).config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
	$locationProvider.html5Mode(true);

	$stateProvider.state('index', {
		url: '/',
		templateUrl: "/views/cv.html"
	});

	$stateProvider.state('cv', {
		url: '/cv',
		templateUrl: "/views/cv.html"
	});

	$stateProvider.state('webtiser', {
		url: '/webtiser',
		templateUrl: "/views/webtiser.html"
	});

	$stateProvider.state('riot', {
		url: '/riot',
		templateUrl: "/views/riot.html"
	});

	$urlRouterProvider.otherwise('/');
}]);
