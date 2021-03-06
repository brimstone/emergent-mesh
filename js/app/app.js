/*global angular:true, List_Ctrl:true, Board_Ctrl:true */
window.app = angular.module('WebUI', ['ui.bootstrap', 'ngRoute', 'ngResource', 'graphing.directives', 'templates'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	"use strict";
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/board', {templateUrl: 'board/list.html', controller: 'List_Ctrl'})
	.when('/board/:board_id', {templateUrl: 'board/board.html', controller: 'Board_Ctrl'})
	.when('/board/post/:post_id', {templateUrl: 'board/post.html', controller: 'Post_Ctrl'})
	.when('/board/new/:type/:id', {templateUrl: 'board/new.html', controller: 'New_Post_Ctrl'})
	.when('/wiki', {redirectTo: "/wiki/main"})
	.when('/wiki/:page_id', {templateUrl: 'wiki/wiki.html', controller: 'Wiki_Ctrl'})
	.when('/', {templateUrl: 'index/index.html'})
	.otherwise({redirectTo: '/'});
}]);


