/* global Markdown:true */
window.app.controller('Wiki_Ctrl', ['$scope', 'DB_Service', '$routeParams', function ($scope, DB_Service, $routeParams) {
	"use strict";

	var page_id = $routeParams.page_id;
	$scope.page_id = page_id;
	$scope.state = "page";
	if (page_id === "") {
		page_id = "index";
	}

	//console.log(DB_Service);
	//window.db_service = DB_Service;
	$scope.page = DB_Service.get('wiki', page_id);

	$scope.page.$promise.then(function() {
		var converter1 = new Markdown.Converter();
		var editor1 = new Markdown.Editor(converter1);
		editor1.run();
	});
}]);
