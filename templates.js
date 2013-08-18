angular.module('templates', ['partial/board.html', 'partial/index.html', 'partial/list.html', 'partial/post.html']);

angular.module("partial/board.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("partial/board.html",
		"<ul class=\"breadcrumb\">\n" +
		"	<li><a href=\"/board/#/board\">Boards</a></li>\n" +
		"	<li class=\"active\" ng-bind=\"boards[board_id].name\">Board</li>\n" +
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

angular.module("partial/index.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("partial/index.html",
		"<div class=\"jumbotron\">\n" +
		"	<h1>Don't Panic</h1>\n" +
		"	<p>You've connected to a wireless mesh setup to provide communication with other people in the area.</p>\n" +
		"	<p><a href=\"#/about\" class=\"btn btn-primary btn-large\">Learn more &raquo;</a> \n" +
		"	<a href=\"\" class=\"btn btn-primary btn-success btn-large\">Let me online &raquo;</a></p>\n" +
		"</div>\n" +
		"\n" +
		"<!-- Example row of columns -->\n" +
		"<div class=\"row\">\n" +
		"	<div class=\"col-lg-4\">\n" +
		"		<h2>Message Board</h2>\n" +
		"		<p>Here is a place to post information about what's around you and read about what is around other people. </p>\n" +
		"		<p><a href=\"#/board\" class=\"btn btn-primary\">Board &raquo;</a></p>\n" +
		"	</div>\n" +
		"	<div class=\"col-lg-4\">\n" +
		"		<h2>Local Resources</h2>\n" +
		"		<p>Looking for water or electricity near by?</p>\n" +
		"		<p><a href=\"#/wiki\" class=\"btn btn-primary\">Resources &raquo;</a></p>\n" +
		"	</div>\n" +
		"	<div class=\"col-lg-4\">\n" +
		"		<h2>Live Webchat</h2>\n" +
		"		<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n" +
		"		<p><a href=\"#/chat\" class=\"btn btn-primary\">Chat &raquo;</a></p>\n" +
		"	</div>\n" +
		"</div>\n" +
		"");
}]);

angular.module("partial/list.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("partial/list.html",
		"<ul class=\"breadcrumb\">\n" +
		"	<li class=\"active\">Boards</li>\n" +
		"	<a href=\"\" class=\"pull-right\"><i class=\"icon-file\"></i> New</a>\n" +
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
