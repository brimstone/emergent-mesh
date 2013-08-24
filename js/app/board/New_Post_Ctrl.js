window.app.controller('New_Post_Ctrl', ['$scope', 'DB_Service', '$routeParams', function ($scope, DB, $routeParams) {
	"use strict";
	$scope.board_id = $routeParams.board_id;
	$scope.boards = DB.get('boards');
	//setTimeout(function(){ console.log("New Post found the following:", $scope.boards); }, 2000);
	$scope.save = function () {
		console.log("Saving data");
	};
}]);
