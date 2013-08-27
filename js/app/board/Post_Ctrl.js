window.app.controller('Post_Ctrl', ['$scope', 'DB_Service', '$routeParams', function ($scope, DB, $routeParams) {
	"use strict";
	$scope.boards = DB.get('boards');

	$scope.post_id = $routeParams.post_id;
	$scope.posts = [];
	$scope.post = {};

	$scope.allposts = DB.get('posts').next(function(){
		$scope.posts = [];
		$scope.post = {};
		for (var p in $scope.allposts) {
			if ($scope.allposts[p].parent_id === $scope.post_id) {
				var post = $scope.allposts[p];
				post.id = p;
				$scope.posts.push(post);
			}
		}
		$scope.post = $scope.allposts[$routeParams.post_id];
		$scope.board = $scope.boards[$scope.post.board_id];
	});
}]);
