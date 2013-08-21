window.app.controller('Board_Ctrl', ['$scope', 'DB_Service', '$routeParams', function ($scope, DB_Service, $routeParams) {
	"use strict";
	$scope.boards = DB_Service.boards;
	$scope.board_id = $routeParams.board_id;
	$scope.allposts = DB_Service.posts;
	$scope.allposts.$promise.then(function(){
		for (var p in $scope.allposts) {
			if (($scope.allposts[p].board_id + 0) === parseInt($scope.board_id, 10)) {
				if ($scope.allposts[p].parent_id === null) {
					var post = $scope.allposts[p];
					post.id = p;
					$scope.posts.push(post);
				}
			}
		}
	});
	$scope.posts = [];
}]);
