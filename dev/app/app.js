'use strict';

var angular = require('angular');
require('angular-route');
var app = angular.module('app', ['ngRoute']);

require('./common');
require('./components');

app.config(require('./routeConfig'));

// app.config(function($routeProvider) {
// 	$routeProvider.when('/', {
// 		templateUrl: 'app/components/main/main.view.html',
// 		controller: 'mainCtrl',
// 		controllerAs: 'main'
// 	})
// 	.otherwise({
// 		redirectTo: '/'
// 	});
// });