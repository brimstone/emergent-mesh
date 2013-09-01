/* global Markdown:true */
window.app.controller('Wiki_Ctrl', ['$scope', 'DB_Service', '$routeParams', function ($scope, DB, $routeParams) {
	"use strict";

	var page_id = $routeParams.page_id;
	$scope.page_id = page_id;
	$scope.state = "page";
	if (page_id === "") {
		page_id = "index";
	}

	var editor;

	$scope.page = DB.get('wiki', page_id);

	$scope.page.next(function() {
		if (!editor) {
			editor = new Markdown.Editor(new Markdown.Converter());
			editor.run();
		}
	});
}]);
