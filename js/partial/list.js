/*global angular:true */
angular.module("partials/list.html", []).run(["$templateCache", function($templateCache) {
	"use strict";
	$templateCache.put("partials/list.html",
'<ul class="breadcrumb">' +
'  <li class="active">Boards</li>' +
'</ul>' +
'<table class="table table-striped">' +
'<tr>' +
'	<th>Board</th>' +
'	<th width="12.5%" style="text-align: center">Topics</th>' +
'	<th width="12.5%" style="text-align: center">Posts</th>' +
'	<th width="25%">Last Post</th>' +
'</tr>' +
'<tr ng-repeat="board in boardkeys">' + /* TODO figure out how to get the board id */
'	<td><a href="/board/#/board/{{board}}">{{boards[board].name}}</a><br />{{boards[board].description}}</td>' +
'	<td style="text-align: center">1</td>' +
'	<td style="text-align: center">2</td>' +
'	<td><a href="/board/#/topic/">Lost Kitty</a><br />Joe User - 22 min ago</td>' +
'</tr>' +
'</table>'
);}]);
