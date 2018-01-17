'use strict';

var routeConfig = /*@ngInject*/ function($stateProvider, $urlRouterProvider, $locationProvider) {

	$urlRouterProvider.otherwise('/notfound');

	$stateProvider

		.state('home', {
			url: '/',
			templateUrl: 'app/components/main/main.view.html',
			controller: 'mainCtrl',
			controllerAs: 'main'
		})

		.state('notfound', {
			url: '/notfound',
			templateUrl: 'app/components/notfound/notfound.view.html'
		});

	$locationProvider.html5Mode(true);
}

module.exports = routeConfig;