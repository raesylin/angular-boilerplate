'use strict';

var routeConfig = /*@ngInject*/ function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'app/components/main/main.view.html',
		controller: 'mainCtrl',
		controllerAs: 'main'
	})
	.otherwise({
		redirectTo: '/'
	});
};

module.exports = routeConfig;