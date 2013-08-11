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
'<div class="panel">' +
'<div class="panel-heading"><b ng-bind="post.title"></b> by {{post.author}} - 30 min ago</div>' +
'<p ng-bind="post.text"></p>' +
'</div>' +
'<div class="panel" ng-repeat="post in posts">' +
'<div class="panel-heading"><b ng-bind="post.title"></b> by {{post.author}} - 30 min ago</div>' +
'<p ng-bind="post.text"></p>' +
'</div>' +
'</div>'
);}]);
