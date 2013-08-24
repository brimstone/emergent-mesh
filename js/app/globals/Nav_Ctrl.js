window.app.controller('Nav_Ctrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
	"use strict";
	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		$scope.navCollapsed = false;
	});
}]);
