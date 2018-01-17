'use strict';

var angular = require('angular');
window.$ = window.jQuery = require('jquery');
// window._ = require('lodash');  // npm install and uncomment

require('@uirouter/angularjs');
require('angular-aria');
require('angular-animate');
require('angular-messages');
require('angular-sanitize');

/* INSTANTIATE APP */
var app = angular.module('app', [
		'ui.router',
		'ngAnimate',
		'ngMessages',
		'ngSanitize'
	]);

/* IMPORT DIRECTIVES, COMPONENTS AND SERVICES */
require('./common');
require('./components');

app.config(require('./routeConfig'));