window.app.controller('List_Ctrl', ['$scope', 'DB_Service', function ($scope, DB) {
	"use strict";
	$scope.boards = DB.get('boards');
	$scope.posts = DB.get('posts');
}]);
