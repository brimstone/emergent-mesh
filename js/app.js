/*global angular:true, List_Ctrl:true, Board_Ctrl:true */
window.app = angular.module('WebUI', ['ui.bootstrap', 'ngResource', 'graphing.directives', 'templates'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	"use strict";
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/board', {templateUrl: 'partial/list.html', controller: 'List_Ctrl'})
	.when('/board/:board_id', {templateUrl: 'partial/board.html', controller: 'Board_Ctrl'})
	.when('/board/post/:post_id', {templateUrl: 'partial/post.html', controller: 'Post_Ctrl'})
	.when('/', {templateUrl: 'partial/index.html'});
	//.otherwise({redirectTo: '/board'});
}]);


