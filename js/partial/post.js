/*global angular:true */
angular.module("partials/post.html", []).run(["$templateCache", function($templateCache) {
	"use strict";
	$templateCache.put("partials/post.html",
'<ul class="breadcrumb">' +
'  <li><a href="/board/#/board">Boards</a></li>' +
'  <li><a href="/board/#/board/{{post.board_id}}" ng-bind="boards[post.board_id].name">Board</a></li>' +
'  <li class="active" ng-bind="post.title">Post</li>' +
'</ul>' +
'<div class="container">' +
'<div class="well well-small">' +
'<h3 ng-bind="post.title"></h3>' +
'by <span ng-bind="post.author"></span> - 30 min ago' +
'<p ng-bind="post.text"></p>' +
'</div>' +
'<div class="well well-small" ng-repeat="post in posts">' +
'<h3 ng-bind="post.title"></h3>' +
'by <span ng-bind="post.author"></span> - 30 min ago' +
'<p ng-bind="post.text"></p>' +
'</div>' +
'</div>'
);}]);
