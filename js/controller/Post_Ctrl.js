window.app.controller('Post_Ctrl', ['$scope', 'DB_Service', '$routeParams', function ($scope, DB_Service, $routeParams) {
	"use strict";
	$scope.boards = DB_Service.boards;

	$scope.post_id = $routeParams.post_id;
	$scope.post = {};
	$scope.posts = [];

	$scope.allposts = DB_Service.posts;
	$scope.allposts.$then(function(){
		for (var p in $scope.allposts) {
			if ($scope.allposts[p].parent_id === $scope.post_id) {
				var post = $scope.allposts[p];
				post.id = p;
				$scope.posts.push(post);
			}
		}
		$scope.post = $scope.allposts[$routeParams.post_id];
		console.log($scope.posts);
		$scope.board = DB_Service.boards[$scope.post.board_id];
	});
}]);
