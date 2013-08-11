window.app.factory("DB_Service", ['$rootScope', '$resource', function($rootScope, $resource) {
	"use strict";
	var db = $resource('/db/:db/:id', {}, {
		get: {method: 'GET'},
		get_all: {method: 'GET', params: {id: ''}}
	});

	var boardkeys = [];
	var boards = db.get_all({db: "boards"}, function (){
		for (var key in boards) {
			if (key.substr(0,1) !== '$') {
				boardkeys.push(key.replace(".json", ""));
				boards[key.replace(".json", "")] = boards[key];
				delete boards[key];
			}
		}
	});
	var postkeys = [];
	var posts = db.get_all({db: "posts"}, function (){
		for (var key in posts) {
			if (key.substr(0,1) !== '$') {
				postkeys.push(key.replace(".json", ""));
				posts[key.replace(".json", "")] = posts[key];
				delete posts[key];
			}
		}
	});

	return {
		boards: boards,
		boardkeys: boardkeys,
		posts: posts,
		postkeys: postkeys,
	};
}]);
