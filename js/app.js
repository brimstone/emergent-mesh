/*global angular:true, List_Ctrl:true, Board_Ctrl:true */
window.app = angular.module('WebUI', ['ui.bootstrap', 'ngResource', 'graphing.directives', 'partials/list.html', 'partials/board.html', 'partials/post.html'])
.config(['$routeProvider', function($routeProvider) {
	"use strict";
	$routeProvider
	.when('/board', {templateUrl: 'partials/list.html', controller: 'List_Ctrl'})
	.when('/board/:board_id', {templateUrl: 'partials/board.html', controller: 'Board_Ctrl'})
	.when('/post/:post_id', {templateUrl: 'partials/post.html', controller: 'Post_Ctrl'});
	//.otherwise({redirectTo: '/board'});
}]);


