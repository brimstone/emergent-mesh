angular.module('templates', ['partial/board.html', 'partial/list.html', 'partial/post.html']);

angular.module("partial/board.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("partial/board.html",
		"<ul class=\"breadcrumb\">\n" +
		"  <li><a href=\"/board/#/board\">Boards</a></li>\n" +
		"  <li class=\"active\" ng-bind=\"boards[board_id].name\">Board</li>\n" +
		"</ul>\n" +
		"<div class=\"container\">\n" +
		"<table class=\"table table-striped\">\n" +
		"<tr>\n" +
		"	<th>Post</th>\n" +
		"	<th width=\"12.5%\" style=\"text-align: center\">Replies</th>\n" +
		"	<th width=\"12.5%\" style=\"text-align: center\">Views</th>\n" +
		"	<th width=\"25%\">Last Post</th>\n" +
		"</tr>\n" +
		"<tr ng-repeat=\"post in posts\">\n" +
		"	<td><a href=\"/board/#/post/{{post.id}}\" ng-bind=\"post.title\">Post Title</a><br />by Richard User - 30 min ago</td>\n" +
		"	<td style=\"text-align: center\">1</td>\n" +
		"	<td style=\"text-align: center\">5</td>\n" +
		"	<td><a href=\"/board/#/post/1\">Lost Kitty</a><br />by Joe User - 22 min ago</td>\n" +
		"</tr>\n" +
		"</table>\n" +
		"</div>\n" +
		"");
}]);

angular.module("partial/list.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("partial/list.html",
		"<ul class=\"breadcrumb\">\n" +
		"  <li class=\"active\">Boards</li>\n" +
		"</ul>\n" +
		"<table class=\"table table-striped\">\n" +
		"<tr>\n" +
		"	<th>Board</th>\n" +
		"	<th width=\"12.5%\" style=\"text-align: center\">Topics</th>\n" +
		"	<th width=\"12.5%\" style=\"text-align: center\">Posts</th>\n" +
		"	<th width=\"25%\">Last Post</th>\n" +
		"</tr>\n" +
		"<tr ng-repeat=\"board in boardkeys\"> <!-- TODO figure out how to get the board id -->\n" +
		"	<td><a href=\"/board/#/board/{{board}}\">{{boards[board].name}}</a><br />{{boards[board].description}}</td>\n" +
		"	<td style=\"text-align: center\">1</td>\n" +
		"	<td style=\"text-align: center\">2</td>\n" +
		"	<td><a href=\"/board/#/topic/\">Lost Kitty</a><br />Joe User - 22 min ago</td>\n" +
		"</tr>\n" +
		"</table>\n" +
		"");
}]);

angular.module("partial/post.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("partial/post.html",
		"<ul class=\"breadcrumb\">\n" +
		"  <li><a href=\"/board/#/board\">Boards</a></li>\n" +
		"  <li><a href=\"/board/#/board/{{post.board_id}}\" ng-bind=\"boards[post.board_id].name\">Board</a></li>\n" +
		"  <li class=\"active\" ng-bind=\"post.title\">Post</li>\n" +
		"</ul>\n" +
		"\n" +
		"<div class=\"container\">\n" +
		"<div class=\"panel\">\n" +
		"<div class=\"panel-heading\"><b ng-bind=\"post.title\"></b> by {{post.author}} - 30 min ago</div>\n" +
		"<p ng-bind=\"post.text\"></p>\n" +
		"</div>\n" +
		"<div class=\"panel\" ng-repeat=\"post in posts\">\n" +
		"<div class=\"panel-heading\"><b ng-bind=\"post.title\"></b> by {{post.author}} - 30 min ago</div>\n" +
		"<p ng-bind=\"post.text\"></p>\n" +
		"</div>\n" +
		"</div>\n" +
		"");
}]);
