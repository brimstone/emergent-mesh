/*global angular:true */
angular.module('graphing.directives', [])
.directive("gauge", function() {
	"use strict";
var makeCircle = (function() {
	var PI = Math.PI,
	cos = Math.cos,
	sin = Math.sin,
	circleSegment  = function(centerX, centerY, radius, startAngle, endAngle) {
		var startRadians = startAngle * PI / 180,
			endRadians = endAngle * PI / 180,
			largeArc = ((endRadians - startRadians) % (PI * 2)) > PI ? 1 : 0;
		var startX = centerX + cos(startRadians) * radius,
			startY = centerY + sin(startRadians) * radius,
			endX = centerX + cos(endRadians) * radius,
			endY = centerY + sin(endRadians) * radius;
		var commands = [
			'M', startX, startY,
			'A', radius, radius, 0, largeArc, 1, endX, endY
		];
		return commands.join(' ');
	};
	return function(percent){
		var start = 89,
		end = start + (360 * percent);
		return circleSegment(50, 50, 45, start, end);
	};
}());

	return {
		restrict: "E",
		scope: {"percent": "="},
		//replace: false,
		//transclude: false,
		template: '<svg viewbox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
			'	<circle id="back" cx="50" cy="50" r="50" />' +
			'	<text id="barText" y="62" x="21">{{percent}}%</text>' +
			'	<path id="bar" d="" />' +
			'</svg>',
		link: function(scope, element, attrs) {
			scope.$watch("percent", function(value){
				element.
			});
		}
	};
});
