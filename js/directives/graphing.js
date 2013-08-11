/*global angular:true */
angular.module('graphing.directives', [])
.directive("gauge", function() {
	"use strict";
	return {
		restrict: "E",
		scope: {percent: "="},
		replace: false,
		transclude: false,
		template: '<svg viewbox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
			'	<circle id="back" cx="50" cy="50" r="50" />' +
			'	<text id="barText" y="62" x="21">{{percent}}%</text>' +
			'	<path id="bar" d="" />' +
			'</svg>',
		link: function(scope, element, attrs) {
			scope.$watch(scope.percent, function(value){
				console.log("attrs", attrs);
				console.log("value", value);
			});
		}
	};
});
