window.app.controller('List_Ctrl', ['$scope', 'DB_Service', function ($scope, DB_Service) {
	"use strict";
	$scope.boards = DB_Service.boards;
	$scope.boardkeys = DB_Service.boardkeys;
	$scope.posts = DB_Service.posts;
}]);
