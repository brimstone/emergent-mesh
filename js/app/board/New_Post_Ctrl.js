/* global Markdown:true */
window.app.controller('New_Post_Ctrl', ['$scope', 'DB_Service', '$routeParams', function ($scope, DB, $routeParams) {
	"use strict";
	$scope.boards = DB.get('boards');
	$scope.posts = DB.get('boards').next(function() {
		if ($routeParams.type === "reply") {
			$scope.board_id = $scope.posts[$routeParams.id].board_id;
		}
	});
	if ($routeParams.type === "post") {
		$scope.board_id = $routeParams.id;
	}
	//setTimeout(function(){ console.log("New Post found the following:", $scope.boards); }, 2000);
	$scope.save = function () {
		console.log("Saving data");
	};
	var converter1 = new Markdown.Converter();
	var editor1 = new Markdown.Editor(converter1);
	editor1.run();
}]);
