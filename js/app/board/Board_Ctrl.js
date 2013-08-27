window.app.controller('Board_Ctrl', ['$scope', 'DB_Service', '$routeParams', function ($scope, DB, $routeParams) {
	"use strict";
	$scope.boards = DB.get('boards');
	$scope.board_id = parseInt($routeParams.board_id, 10);
	$scope.uniqueposts = [];
	$scope.posts = DB.get('posts').next(function() {
		$scope.uniqueposts = [];
		var unique, youngest;
		for (var p in $scope.posts._keys) {
			var k=$scope.posts[$scope.posts._keys[p]];
			k.id = $scope.posts._keys[p];
			if (k.board_id !== $scope.board_id) {
				continue;
			}
			unique = {};
			youngest = {};
			if (k.parent_id === null) {
				unique.parent = k;
				$scope.uniqueposts.push(unique);
			}
		}
	});
	/*
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
	*/
}]);
